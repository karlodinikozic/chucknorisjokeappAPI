import { Request, Response } from "express";
import IAuthService from "../services/types";
import IAuthController from "./types";
import { Container, Service } from "typedi";
import AuthService from "../services/authService";

@Service()
class AuthController implements IAuthController {
  private readonly authService: IAuthService = Container.get(AuthService);

  public signup = this.createDefaultAuthResponse(this.authService.signup);
  public login = this.createDefaultAuthResponse(this.authService.login);
  public verifyEmail = this.createDefaultAuthResponse(this.authService.verifyEmail);
  public resendEmail = this.createDefaultAuthResponse(this.authService.resendEmail);

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  private createDefaultAuthResponse<T, K>(
    handleFunction: (data: T) => Promise<K>,
  ) {
    return async (req: Request, res: Response) => {
      try {
        return res.json(await handleFunction(req.body));
      } catch (error) {
        return res.status(400).json({ error: String(error) });
      }
    };
  }
}

export default AuthController;
