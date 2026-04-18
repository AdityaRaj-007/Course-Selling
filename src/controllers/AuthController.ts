import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GlobalError } from "../utils/GlobalError";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, name, role } = req.body;

    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.PASSWORD_SALT),
    );

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        password: hashedPassword,
        role,
        name,
      },
    });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.log(err);
    return next(new GlobalError("Internal Server Error", 500));
  }
};

export const LogIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(
        new GlobalError("Please create an account before LogIn", 400),
      );
    }

    const isMatch = bcrypt.compareSync(password, user?.password);

    if (!isMatch) {
      return next(new GlobalError("Invalid email/password.", 400));
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return next(new GlobalError("Internal Server Error", 500));
  }
};
