import mongoose from "mongoose";
import config from "config";
import { logger } from "../logger";

export async function connectDb() {
  try {
    await mongoose.connect(dbUrl);
    logger.info("Database connected...");
  } catch (err: any) {
    logger.error(err.message, "Database connection failed");
    const timer = setTimeout(() => {
      connectDb();
      process.exit(1);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }
}
