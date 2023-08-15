import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { User } from "../src/authentication/models/User";

const jwtOptions = {
  secretOrKey: process.env.SECRET_KEY, // Replace with your secret key
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.id } });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e, false);
    }
  }),
);

export default passport;
