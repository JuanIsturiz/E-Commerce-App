require("dotenv").config();

//database info configuration
module.exports = {
  PORT: process.env.PORT || 3000,
  GOOGLE: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  },
  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
  },
  SESSION_SECRET: process.env.SESSION_SECRET,
  STRIPE_SECRET: process.env.STRIPE_SECRET,
};
