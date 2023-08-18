import { describe } from "node:test";
import { LoginInputDTO, SignupInputDTO } from "../../authentication/DTO/types";
import supertest from "supertest";
import { User } from "../../user/models/User";
import serverUtil from "../../util/serverUtil";
import bcrypt from "bcrypt";
import jwtHelper from "../../util/jwtHelper";

const app = serverUtil.createServer();

describe("Authentication ", () => {
  describe("Sign up process", () => {
    describe("Given the user email doesn't exist", () => {
      it("should return 200", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `test${Math.random() * 10000 + 1}@email.com`,
          password: "Testaccunt1!",
          firstName: "Test",
          lastName: "Account",
        };
        const expectedOutput = {
          message: `Thank you for registering. We have sent an email to ${mockSignupInput.email} for verification. `,
        };

        //When
        const res = await supertest(app)
          .post("/auth/signup")
          .send(mockSignupInput)
          .set("Accept", "application/json");

        //Then
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
    describe("Given the user with the same email exists", () => {
      it("should return 400", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `test-1@email.com`,
          password: "Testaccunt1!",
          firstName: "Test",
          lastName: "Account",
        };
        await User.create({ ...mockSignupInput });
        const expectedOutput = { error: "Error: Email is already registered" };

        //When
        const res = await supertest(app)
          .post("/auth/signup")
          .send(mockSignupInput)
          .set("Accept", "application/json");

        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
  });
  describe("Login process", () => {
    describe("Given the user has verified his email and signed up", () => {
      it("should return 200 with access key", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testLogin@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };
        //Creates a verified user
        await User.create({ ...mockSignupInput, isVerified: true });

        const mockLoginInput: LoginInputDTO = {
          email: `testLogin@email.com`,
          password: "Testaccunt1!",
        };

        //When
        const res = await supertest(app)
          .post("/auth/login")
          .set("Accept", "application/json")
          .send(mockLoginInput);

        //Then
        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
      });
      it("should return 400 when inputted wrong password", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testLoginWithWrongPassword@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };
        //Creates a verified user
        await User.create({ ...mockSignupInput, isVerified: true });
        const expectedOutput = { error: "Error: Invalid credentials" };

        const mockLoginInput: LoginInputDTO = {
          email: `testLoginWithWrongPassword@email.com`,
          password: "Wrongpassowrd1!",
        };

        //When
        const res = await supertest(app)
          .post("/auth/login")
          .set("Accept", "application/json")
          .send(mockLoginInput);

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
      it("should return 400 when inputted wrong email", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testLoginWithWrongEmail@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };
        //Creates a verified user
        await User.create({ ...mockSignupInput, isVerified: true });
        const expectedOutput = { error: "Error: Invalid credentials" };

        const mockLoginInput: LoginInputDTO = {
          email: `Wrong@email.com`,
          password: "Testaccunt1!",
        };

        //When
        const res = await supertest(app)
          .post("/auth/login")
          .set("Accept", "application/json")
          .send(mockLoginInput);

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
    describe("Given the user has not verified his email and signed up", () => {
      it("should return 400", async () => {
        const mockSignupInput: SignupInputDTO = {
          email: `testLoginNotVerified@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };
        //Creates an unverified user
        await User.create({ ...mockSignupInput });
        const mockLoginInput: LoginInputDTO = {
          email: `testLoginNotVerified@email.com`,
          password: "Testaccunt1!",
        };
        const expectedOutput = { error: "Error: Please verify your email" };

        //When
        const res = await supertest(app)
          .post("/auth/login")
          .set("Accept", "application/json")
          .send(mockLoginInput);

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
    describe("Given the user has not verified his email and not signed up", () => {
      it("should return 400", async () => {
        const mockLoginInput: LoginInputDTO = {
          email: `testLoginNotVerifiedAndSignUp@email.com`,
          password: "Testaccunt1!",
        };
        const expectedOutput = { error: "Error: Invalid credentials" };

        //When
        const res = await supertest(app)
          .post("/auth/login")
          .set("Accept", "application/json")
          .send(mockLoginInput);

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
  });
  describe("Verify Email process", () => {
    describe("Given the user has successfully singed up", () => {
      it("should return 200", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testVerifyEmail@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };
        const signupUser = await User.create({ ...mockSignupInput });
        const token = jwtHelper.jwtSignEmail({ id: signupUser.id });

        const expectedOutput = {
          message:
            "You have successfully verified your email. Please continue to login",
        };
        //When
        const res = await supertest(app)
          .get(`/auth/email-verification/${token}`)
          .set("Accept", "application/json");

        //Then
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(expectedOutput);
      });
      it("should return 400 when user already verified email", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testVerifyEmailVerified@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };
        const signupUser = await User.create({
          ...mockSignupInput,
          isVerified: true,
        });
        const token = jwtHelper.jwtSignEmail({ id: signupUser.id });

        const expectedOutput = {
          error: `Error: User with id: ${mockSignupInput.email} already verified`,
        };
        //When
        const res = await supertest(app)
          .get(`/auth/email-verification/${token}`)
          .set("Accept", "application/json");

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
      it("should return 400 when user doesnt exist", async () => {
        //Given

        const mockId = "Fake ID";
        const token = jwtHelper.jwtSignEmail({ id: mockId });

        const expectedOutput = {
          error: `Error: User with id: ${mockId} doesnt exist`,
        };
        //When
        const res = await supertest(app)
          .get(`/auth/email-verification/${token}`)
          .set("Accept", "application/json");

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
  });
  describe("Resend Email process", () => {
    describe("Given the user has successfully singed up and is missing verification email", () => {
      it("should return 200", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testResendEmail@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };

        await User.create({ ...mockSignupInput });

        const expectedOutput = {
          message: `Thank you for registering. We have resent an email to ${mockSignupInput.email} for verification. `,
        };
        //When
        const res = await supertest(app)
          .post(`/auth/resend-email`)
          .set("Accept", "application/json")
          .send({ email: mockSignupInput.email });

        //Then
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(expectedOutput);
      });
      it("should return 400 when user is already verified his email", async () => {
        //Given
        const mockSignupInput: SignupInputDTO = {
          email: `testResendEmailVerified@email.com`,
          password: await bcrypt.hash("Testaccunt1!", 10),
          firstName: "Test",
          lastName: "Account",
        };

        await User.create({ ...mockSignupInput, isVerified: true });

        const expectedOutput = {
          error: `Error: User with email: ${mockSignupInput.email} already verified`,
        };

        //When
        const res = await supertest(app)
          .post(`/auth/resend-email`)
          .set("Accept", "application/json")
          .send({ email: mockSignupInput.email });

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
      it("should return 400 when user gives wrong email", async () => {
        //Given
        const wrongEmail = "wrongEmail@dot.com"

        const expectedOutput = {
          error: `Error: Invalid email`,
        };

        //When
        const res = await supertest(app)
            .post(`/auth/resend-email`)
            .set("Accept", "application/json")
            .send({ email: wrongEmail });

        //Then
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedOutput);
      });
    });
  });
});

afterAll(async () => {
  await User.destroy({ where: { firstName: "Test" }, force: true });
});
