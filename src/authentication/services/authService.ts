import {EmailInputDTO, LoginInputDTO, SignupInputDTO, UserIdInputDTO} from "../DTO/types";
import jwtHelper from "../../util/jwtHelper";
import IAuthService, {AccessTokenResponse, DefaultMessageResponse, IEmailSender } from "./types";
import {Container, Service} from "typedi";
import EmailSender from "../../util/emailSender";
import IUserRepository from "../../user/repositories/types";
import UserRepository from "../../user/repositories/userRepository";
import Encryptor, {IEncryptor} from "../../util/encryptor";

@Service()
class AuthService implements IAuthService {

  private readonly transporter:IEmailSender = Container.get(EmailSender).transporter;
  private readonly UserRepository: IUserRepository = Container.get(UserRepository)
  private readonly Encryptor: IEncryptor = Container.get(Encryptor)

  private sendEmailVerification = async (email: string, token: string) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification to Chuck Noris Joke API",
      text: `<html lang="en"> 
                <h1>Please click the following link to verify your email:</h1>
                <h2><a href="${process.env.FULL_URL}auth/email-verification/${token}">Press here to verify</a> </h2>   
            </html>`,
    };
    return await this.transporter.sendMail(mailOptions);
  };

  public signup = async (signupInputDTO: SignupInputDTO): Promise<DefaultMessageResponse> => {
    const { email, password, firstName, lastName } = signupInputDTO;

    const existingUser = await this.UserRepository.findOneByValue( { email });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await this.Encryptor.hash(password, 10);
    try {
      const newUser = await this.UserRepository.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      if(!newUser){
        throw new Error("User not save to DB");
      }

      const jwtId = jwtHelper.jwtSignEmail({ id: newUser.id });
      await this.sendEmailVerification(email, jwtId);

      return {
        message: `Thank you for registering. We have sent an email to ${email} for verification.`,
      };

    } catch (error) {
      await this.UserRepository.deleteByValue( { email }, true);
      throw new Error("An error occurred while registering the user\n Error:" + error,);
    }
  };

  public login = async ({email, password}: LoginInputDTO): Promise<AccessTokenResponse> => {
    const user = await this.UserRepository.findOneByValue({email});
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordsMatch = await this.Encryptor.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error("Invalid credentials");
    }

    if (!user.isVerified) {
      throw new Error("Please verify your email");
    }
    const accessToken = jwtHelper.jwtSignEmail({ id: user.id, email: user.email })

    return { accessToken };
  };

  public verifyEmail = async ({userId}: UserIdInputDTO): Promise<DefaultMessageResponse> => {

    const existingUser = await this.UserRepository.findOneById(userId);
    if (!existingUser) {
      throw new Error(`User with id: ${userId} doesnt exist`);
    }
    if (existingUser.isVerified) {
      throw new Error(`User with id: ${existingUser.email} already verified`);
    }

    try {
      existingUser.isVerified = true;
      await existingUser.save();
      return {
        message:
          "You have successfully verified your email. Please continue to login",
      };
    } catch (e) {
      throw new Error(
        "An error occurred while verify the user email\n Error:" + e,
      );
    }
  };

  public resendEmail = async ({email}: EmailInputDTO): Promise<DefaultMessageResponse> => {
    const user = await this.UserRepository.findOneByValue({email});
    if (!user) {
      throw new Error("Invalid credentials");
    }
    if (user.isVerified) {
      throw new Error(`User with email: ${user.email} already verified`);
    }

    const token = jwtHelper.jwtSignEmail({ id: user.id });
    try {
      await this.sendEmailVerification(email, token);
      return { message: `Thank you for registering. We have resent an email to ${email} for verification.`};

    } catch (e) {
      throw new Error("An error occurred while resending verification email to user.\n Error:" + e);
    }
  };
}

export default AuthService;


