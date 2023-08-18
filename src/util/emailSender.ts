import nodemailer from "nodemailer";
import {Service} from "typedi";
import dotenv from "dotenv";


dotenv.config()

@Service()
class EmailSender {

  public transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT || "-1"),
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_KEY,
    },
  })
}

export default EmailSender;
