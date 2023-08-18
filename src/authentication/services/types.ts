import {EmailInputDTO, LoginInputDTO, SignupInputDTO, UserIdInputDTO} from "../DTO/types";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface IAuthService {
  signup(data: SignupInputDTO): Promise<DefaultMessageResponse>;

  login(data: LoginInputDTO): Promise<AccessTokenResponse>;

  verifyEmail(data: UserIdInputDTO): Promise<DefaultMessageResponse>;

  resendEmail(data: EmailInputDTO): Promise<DefaultMessageResponse>;
}

export type DefaultMessageResponse = {
  message: string;
};

export type AccessTokenResponse = {
  accessToken: string;
};

export interface IEmailSender{
  sendMail: ( mailOptions: Mail.Options) =>  Promise<SMTPTransport.SentMessageInfo>
}




export default IAuthService;
