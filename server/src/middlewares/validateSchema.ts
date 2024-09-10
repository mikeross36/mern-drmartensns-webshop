import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { logger } from "../utils/logger";

export function validateSchema(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (err: any) {
      logger.error(err.message);
      return res.status(400).json({ message: err.message });
    }
  };
}
