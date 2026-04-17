import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type ValidationSchema = {
  body?: ZodType<any>;
  query?: ZodType<any>;
};

export const validate =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (schema.body) {
      const result = schema.body.safeParse(req.body);

      if (!result.success) {
        return res.status(500).json({ error: result.error.issues });
      }

      req.body = result.data;
    }

    next();
  };
