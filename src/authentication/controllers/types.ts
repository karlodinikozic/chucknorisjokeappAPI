import { Request, Response } from "express";

type defaultResponseHandler = (req: Request, res: Response) => Promise<Response>;

interface IAuthController {
    signup: defaultResponseHandler
    login: defaultResponseHandler
    verifyEmail: defaultResponseHandler
    resendEmail: defaultResponseHandler
}



export default IAuthController;
