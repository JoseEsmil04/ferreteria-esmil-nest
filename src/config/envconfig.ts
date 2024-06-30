
export const EnvConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 4041,
  mongoDbUri: process.env.MONGODB_URI,
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT, 10) || 4,
  jwtKey: process.env.JWT_KEY
})