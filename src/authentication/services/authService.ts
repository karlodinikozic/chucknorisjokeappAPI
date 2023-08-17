import { LoginInputDTO, SignupInputDTO } from "../DTO/types";
import { User } from "../../user/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../../util/emailSender";
import jwtHelper from "../../util/jwtHelper";

const sendEmailVerification = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification to Chuck Noris Joke API",
    text: `<html lang="en"> 
                <h1>Please click the following link to verify your email:</h1>
                <h2><a href="${process.env.FULL_URL}auth/email-verification/${token}">Press here to verify</a> </h2>   
            </html>`,
  };
  return await transporter.sendMail(mailOptions);
};

const signup = async (signupInputDTO: SignupInputDTO) => {
  const { email, password, firstName, lastName } = signupInputDTO;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const jwtId = jwtHelper.jwtSignEmail({ id: newUser.id });
    await sendEmailVerification(email, jwtId);

    return {
      messege: `Thank you for registering. We have sent an email to ${email} for verification. `,
    };
  } catch (error) {
    console.error(error);
    await User.destroy({ where: { email }, force: true });

    throw new Error(
      "An error occurred while registering the user\n Error:" + error,
    );
  }
};

const verifyEmail = async (userId: string) => {
  const existingUser = await User.findOne({ where: { id: userId } });
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

const login = async ({ email, password }: LoginInputDTO) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new Error("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email");
  }

  const key = process.env.SECRET_KEY || "";

  const accessToken = jwt.sign({ id: user.id, email: user.email }, key, {
    expiresIn: "1h",
  });
  return { accessToken };
};

const resendEmail = async (email: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw new Error("Invalid email");
  }
  if (existingUser.isVerified) {
    throw new Error(`User with email: ${existingUser.email} already verified`);
  }

  const token = jwtHelper.jwtSignEmail({ id: existingUser.id });
  try {
    await sendEmailVerification(email, token);
    return {
      messege: `Thank you for registering. We have resent an email to ${email} for verification. `,
    };
  } catch (e) {
    throw new Error(
      "An error occurred while resending verification email to user.\n Error:" + e,
    );
  }
};

export default { signup, login, verifyEmail, resendEmail };
