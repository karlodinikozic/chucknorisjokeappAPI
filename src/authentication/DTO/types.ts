type EmailInputDTO = {
  email: string;
};

type UserIdInputDTO = {
  userId: string;
};

type SignupInputDTO = EmailInputDTO & {
  password: string;
  firstName: string;
  lastName: string;
};

type LoginInputDTO = EmailInputDTO & {
  password: string;
};

export { SignupInputDTO, LoginInputDTO, EmailInputDTO, UserIdInputDTO };
