const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { GOOGLE } = require("../config");
const pool = require("../db/dbConfig");

passport.use(
  new GoogleStrategy(
    {
      scope: ["email", "profile"],
      clientID: GOOGLE.GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE.GOOGLE_REDIRECT_URI,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const { sub, given_name, family_name, email } = profile._json;
      const findQuery = await pool.query(
        "SELECT * FROM users WHERE google_id = $1",
        [sub]
      );
      const findCheck = findQuery.rowCount;

      if (!findCheck) {
        await pool.query(
          "INSERT INTO users (email, first_name, last_name, google_id) VALUES ($1, $2, $3, $4) RETURNING *",
          [email, given_name, family_name, sub]
        );
      }
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
