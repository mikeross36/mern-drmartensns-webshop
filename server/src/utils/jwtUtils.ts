import jwt, { SignOptions, JsonWebTokenError } from "jsonwebtoken";
import config from "config";
import { logger } from "./logger";

export function signJwt(
  payload: Object,
  key: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions = {}
) {
  try {
    const privateKey = Buffer.from(config.get<string>(key), "base64").toString(
      "ascii"
    );
    return jwt.sign(payload, privateKey, {
      ...(options && options),
      algorithm: "RS256",
      allowInsecureKeySizes: true,
    });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      logger.error(err.message);
      throw new Error(`Error signing JWT: ${err.message}`);
    }
  }
}

export function verifyJwt<T>(
  token: string,
  key: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null {
  try {
    const publicKey = Buffer.from(config.get<string>(key), "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey) as T;
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      switch (err.name) {
        case "JsonWebTokenError": {
          logger.error(err.message);
          throw new Error(`Invalid JWT: ${err.message}`);
        }
        case "TokenExpiredError": {
          logger.error(err.message);
          throw new Error("JWT has been expired");
        }
        default:
          logger.error("Error occured while verifying the JWT");
          throw new Error("An unknown error occurred while verifying the JWT");
      }
    } else {
      throw new Error("An unknown error occurred while verifying the JWT");
    }
  }
}
