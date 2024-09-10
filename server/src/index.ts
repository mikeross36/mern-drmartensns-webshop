require("dotenv").config();
import express, { urlencoded } from "express";
import { corsOptions } from "./utils/options";
import { logger } from "./utils/logger";
import { connectDb } from "./utils/connections/connectDb";
import config from "config";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import path from "path";

import authRouter from "./routes/authRoutes";
import footwearRouter from "./routes/footwearRoutes";
import categoryRouter from "./routes/categoryRoutes";
import userRouter from "./routes/userRoutes";
import reviewRouter from "./routes/reviewRoutes";
import orderRouter from "./routes/orderRoutes";
import keyRouter from "./routes/keyRoutes";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(corsOptions);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "deveopment") app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: "status code 429 To many requests from this IP address!",
// });
// app.use("/api", limiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/footwear", footwearRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/keys", keyRouter);

const port = config.get("port");

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
  connectDb();
});
