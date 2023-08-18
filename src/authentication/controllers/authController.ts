import { Request, Response } from "express";
import IAuthService from "../services/types";
import IAuthController from "./types";



class AuthController implements IAuthController{
  private readonly authService: IAuthService;

  public signup;
  public login;
  public verifyEmail;
  public resendEmail;


  constructor(authService: IAuthService) {
    this.authService = authService;
    this.signup  = this.createDefaultAuthResponse(this.authService.signup)
    this.login  = this.createDefaultAuthResponse(this.authService.login)
    this.verifyEmail  = this.createDefaultAuthResponse(this.authService.verifyEmail)
    this.resendEmail  = this.createDefaultAuthResponse(this.authService.resendEmail)
  }

  private createDefaultAuthResponse <T,K>(handleFunction: (data:T)=>Promise<K>) {
    return async (req: Request, res: Response)=>{
      try {
        return res.json(await handleFunction(req.body));
      } catch (error) {
        return res.status(400).json({ error:  String(error)});
    }
  }}

}
export default AuthController;
