import IAuthService from "../services/types";
import IAuthController from "./types";
import { Container, Service } from "typedi";
import AuthService from "../services/authService";
import {createDefaultRequestWithBodyResponse} from "../../functions/createControllerResponse";

@Service()
class AuthController implements IAuthController {
  private readonly authService: IAuthService = Container.get(AuthService);

  public signup = createDefaultRequestWithBodyResponse(this.authService.signup);
  public login = createDefaultRequestWithBodyResponse(this.authService.login);
  public verifyEmail = createDefaultRequestWithBodyResponse(this.authService.verifyEmail);
  public resendEmail = createDefaultRequestWithBodyResponse(this.authService.resendEmail);

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

}

export default AuthController;
