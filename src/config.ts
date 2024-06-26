const {
  PORT,
  CLIENT_URL,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REDIS_URL,
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY,
  R2_SECRET_KEY,
  R2_BUCKET_NAME,
  NODE_ENV,
} = process.env;

if (
  !PORT ||
  !CLIENT_URL ||
  !DATABASE_URL ||
  !ACCESS_TOKEN_SECRET ||
  !REFRESH_TOKEN_SECRET ||
  !REDIS_URL ||
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY ||
  !R2_SECRET_KEY ||
  !R2_BUCKET_NAME ||
  !NODE_ENV
) {
  throw new Error("Missing environment variables");
}

export {
  PORT,
  CLIENT_URL,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REDIS_URL,
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY,
  R2_SECRET_KEY,
  R2_BUCKET_NAME,
  NODE_ENV,
};
