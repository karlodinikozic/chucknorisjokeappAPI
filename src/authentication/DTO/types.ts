type SignupInputDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type LoginInputDTO = {
    email: string;
    password: string;
}

export { SignupInputDTO, LoginInputDTO };
