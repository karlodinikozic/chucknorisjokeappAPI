import { defaultResponseHandler } from "../../functions/createControllerResponse";

interface IUserController {
  getLoggedInUser: defaultResponseHandler;
  getAllUsers: defaultResponseHandler;
}

export default IUserController;
