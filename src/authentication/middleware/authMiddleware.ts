import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwtHelper from "../../util/jwtHelper";

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const loginSchema = emailSchema.keys({
  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
});

const signupSchema = loginSchema.keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const createRequestBodyValidator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    return next();
  };
};

const validateEmail = createRequestBodyValidator(emailSchema);
const validateLogin = createRequestBodyValidator(loginSchema);
const validateSignup = createRequestBodyValidator(signupSchema);

const jwtAuthenticator = passport.authenticate("jwt", { session: false });

const extractUserIdFromEmailValidationToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;

  try {
    if (!token) {
      new Error("Missing param token");
    }

    req.body.id = jwtHelper.jwtVerifyEmail(token);
    next();
  } catch (e) {
    console.error(e);
    const errorMessage = String(e);
    return res.status(400).json({ error: errorMessage });
  }
};

export default {
  validateEmail,
  validateLogin,
  validateSignup,
  jwtAuthenticator,
  extractUserIdFromEmailValidationToken,
};
