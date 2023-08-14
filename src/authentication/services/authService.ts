import { LoginInputDTO, SignupInputDTO } from "../DTO/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const signup = async (signupInputDTO: SignupInputDTO) => {
  const { email, password, firstName, lastName } = signupInputDTO;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    return await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while registering the user");
  }
};

const login = async ({ email, password }: LoginInputDTO) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

export default { signup, login };
