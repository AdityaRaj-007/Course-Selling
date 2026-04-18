import type { NextFunction, Request, Response } from "express";
import type { GlobalError } from "../utils/GlobalError";

export const errorMiddleware = (
  err: Error | GlobalError | any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode;
  const status = err.status;
  const error = err.message;

  return res.status(statusCode).json({
    statusCode,
    error,
    timestamp: new Date().toISOString(),
  });
};
