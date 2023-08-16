import jwt from "jsonwebtoken";
import { EmailValidationToken } from "../authentication/types";

const SECRET = process.env.EMAIL_SECRET || "";
const jwtSignEmail = (payload: object) => {
  //TODO ABSTRACT THIS
  return jwt.sign(payload, SECRET, {
    expiresIn: "30d",
  });
};

const jwtVerifyEmail = (token: string) => {
  const { id } = jwt.verify(token, SECRET) as EmailValidationToken;
  return id;
};

export default { jwtSignEmail,jwtVerifyEmail };
