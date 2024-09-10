import { prop, index, pre, modelOptions, Severity } from "@typegoose/typegoose";
import argon2 from "argon2";
import crypto from "crypto";
import { logger } from "../utils/logger";

@index({ email: 1 })
@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@pre<User>("save", async function () {
  if (!this.isModified("password") || this.isNew) return;
  this.passwordResetAt = new Date(Date.now() - 1000);
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class User {
  [x: string]: any;

  _id?: string;

  @prop({ required: true })
  userName: string;

  @prop({ required: true, lowercase: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ default: "user" })
  role: string;

  @prop({ default: "default.jpg" })
  photo: string;

  @prop({ select: false })
  verificationCode: string | undefined;

  @prop({ default: false })
  userVerified: boolean;

  @prop({ select: false })
  passwordResetToken: string | undefined;

  @prop({ select: false, type: () => Date })
  passwordResetAt: Date | undefined;

  @prop({ select: false })
  passwordResetExpires: Date | undefined;

  @prop({ type: () => Date })
  passwordUpdatedAt: Date;

  @prop({ default: true, select: false })
  active: boolean;

  async matchPasswords(this: User, loginPassword: string) {
    const isMatch = await argon2.verify(this.password, loginPassword);
    return isMatch;
  }

  createVerificationCode(this: User) {
    const verificationString = crypto.randomBytes(32).toString("hex");
    this.verificationCode = crypto
      .createHash("sha256")
      .update(verificationString)
      .digest("hex");

    return verificationString;
  }

  createResetToken(this: User) {
    const passwordResetString = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(passwordResetString)
      .digest("hex");
    logger.info({ passwordResetString }, this.passwordResetToken);
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    return passwordResetString;
  }
}
