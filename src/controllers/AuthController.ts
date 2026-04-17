import type { Request, Response } from "express";
import { prisma } from "../db";

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
        name,
      },
    });

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
