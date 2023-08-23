import { describe } from "node:test";
import AuthService from "../../authentication/services/authService";
import { SignupInputDTO } from "../../authentication/DTO/types";
import UserRepository from "../../user/repositories/userRepository";
import supertest from "supertest";
import serverUtil from "../../util/serverUtil";
import { User } from "../../user/models/User";
import Encryptor from "../../util/encryptor";
import "../../../src/config/passport.config"; // * Passport Config

const app = serverUtil.createServer();
describe("Joke ", () => {
  describe("User is authenticated with valid jwt", () => {
    it("should return 200 ", async () => {
      //Given
      const encryptor = new Encryptor();
      const mockPassword = "Testaccunt1!";
      const mockSignupInput: SignupInputDTO = {
        email: `testJoke@email.com`,
        password: await encryptor.hash(mockPassword, 10),
        firstName: "Test",
        lastName: "Account",
      };
      //Creates a verified user

      // //Create a verified user in added it to DB
      const userRepository = new UserRepository();
      await userRepository.create({ ...mockSignupInput, isVerified: true });

      //Get valid access token
      const authService = new AuthService();
      const { accessToken } = await authService.login({
        email: mockSignupInput.email,
        password: mockPassword,
      });

      const expectedStructure = {
        categories: expect.any(Array),
        created_at: expect.any(String),
        icon_url: expect.any(String),
        id: expect.any(String),
        updated_at: expect.any(String),
        url: expect.any(String),
        value: expect.any(String),
      };

      //When
      const res = await supertest(app)
        .get("/joke")
        .set({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        });
      //Then
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedStructure);
    });
  });
  describe("User is not authenticated with valid jwt", () => {
    it("should return 400 ", async () => {
      //Given
      const wrongToken = "wrongToken";
      const expected = {};

      //When
      const res = await supertest(app)
        .get("/joke")
        .set({
          Authorization: `Bearer ${wrongToken}`,
          Accept: "application/json",
        });

      //Then
      expect(res.status).toBe(401);
      expect(res.body).toStrictEqual(expected);
    });
  });
});
afterAll(async () => {
  await User.destroy({ where: { firstName: "Test" }, force: true });
});
