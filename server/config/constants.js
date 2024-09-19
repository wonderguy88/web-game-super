module.exports = {
  SALT_ROUNDS: 10,
  PORT: process.env.PORT || 4000,
  apiUrl: process.env.API_URL || "http://localhost:4567",
  apiUrlDemo: process.env.API_URL_DEMO || "http://localhost:4567",
  apiUrlResource:
    process.env.apiUrlResource || "http://regioncheck.net:8353/api",
  apiKey: process.env.API_KEY || "qqqqqqq",
  jwtSecret: process.env.JWT_SECRET || "123456",
};
