import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/express";
import { GlobalError } from "../utils/GlobalError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new GlobalError("Unauthorized: No token provided.", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new GlobalError("No token provided", 401));
  }
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);

    req.user = decoded as UserPayload;
    next();
  } catch (err) {
    return next(new GlobalError("Error occurred while LogIn", 500));
  }
};
