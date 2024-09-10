import { Request } from "express";

export type SmtpTypes = {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
};

export interface ICustomRequest<T>
  extends Request<Record<string, never>, Record<string, never>, T> {
  body: T;
}

export type FilterFieldsType = {
  userName: string;
  email: string;
  photo: string;
};
