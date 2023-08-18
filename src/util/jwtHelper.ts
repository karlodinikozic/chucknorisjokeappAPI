import jwt from "jsonwebtoken";
import { EmailValidationToken } from "../authentication/types";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "-1";
const PASSWORD_SECRET = process.env.SECRET_KEY || "-1";

const jwtSignEmail = (payload: object) => {
  //TODO ABSTRACT THIS
  return jwt.sign(payload, EMAIL_SECRET, {expiresIn: "30d"});
};

const jwtVerifyEmail = (token: string) => {
  const { id } = jwt.verify(token, EMAIL_SECRET) as EmailValidationToken;
  return id;
};

const jwtSignAccessToken = (payload: object) => {
  return jwt.sign(payload, PASSWORD_SECRET, {expiresIn: "1h"});
}


export default { jwtSignEmail,jwtVerifyEmail,jwtSignAccessToken };
