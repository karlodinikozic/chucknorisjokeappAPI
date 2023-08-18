import {defaultResponseHandler} from "../../functions/createControllerResponse";

interface IAuthController {
    signup: defaultResponseHandler
    login: defaultResponseHandler
    verifyEmail: defaultResponseHandler
    resendEmail: defaultResponseHandler
}



export default IAuthController;
