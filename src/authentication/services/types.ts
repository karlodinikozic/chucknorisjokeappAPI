import { LoginInputDTO, SignupInputDTO } from "../DTO/types";

interface IAuthService {
  signup(data: SignupInputDTO): Promise<DefaultMessageResponse>;

  login(data: LoginInputDTO): Promise<AccessTokenResponse>;

  verifyEmail(id: string): Promise<DefaultMessageResponse>;

  resendEmail(email: string): Promise<DefaultMessageResponse>;
}

export type DefaultMessageResponse = {
  message: string;
};

export type AccessTokenResponse = {
  accessToken: string;
};

export default IAuthService;
