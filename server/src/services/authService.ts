import { User } from "../models/userModel";
import { signJwt } from "../utils/jwtUtils";
import config from "config";
import redisClient from "../utils/connections/connectRedis";

export function generateToken(user: Partial<User>) {
  if (!user._id) {
    throw new Error("User ID is required");
  }
  const accessToken = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get<string>("accessTokenExpiresIn")}m`,
  });

  const refreshToken = signJwt({ sub: user._id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<string>("refreshTokenExpiresIn")}m`,
  });

  // create redis session
  redisClient.set(user._id.toString(), JSON.stringify(user), { EX: 60 * 60 });

  return { accessToken, refreshToken };
}
