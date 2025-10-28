import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UnAuthorizedException } from "../utils/app-error";
import { envVars } from "./env.config";
import { findByIdUserService } from "../services/user.service";

passport.use(
      new JwtStrategy(
            {
                  jwtFromRequest: ExtractJwt.fromExtractors([
                        (req) => {
                              const token = req.cookies.accessToken;
                              if (!token) throw new UnAuthorizedException("Unauthorized access");
                              return token;
                        }
                  ]),
                  secretOrKey: envVars.JWT_SECRET_TOKEN,
                  audience: ["user"],
                  algorithms: ["HS256"]
            },
            async ({ userId }, done) => {
                  try {
                        const user = userId && (await findByIdUserService(userId));
                        return done(null, user || false);
                  } catch (error) {
                        return done(error)
                  }
            }
      )
);

export const passportAuthenticateJwt = passport.authenticate("jwt", { session: false });
