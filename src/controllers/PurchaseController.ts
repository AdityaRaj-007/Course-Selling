import type { Request, Response } from "express";
import { prisma } from "../db";
import { v4 as uuidv4 } from "uuid";

export const purchaseCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const { userId, role } = req.user!;

    if (!courseId) {
      return res.status(400).json({ message: "Invalid field." });
    }

    if (role !== "STUDENT") {
      return res
        .status(400)
        .json({ message: "Create a student account to but the course." });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return res.status(400).json({ message: "Course not found." });
    }

    if (userId === course.instructorId) {
      return res
        .status(400)
        .json({ message: "You cannot buy your own course." });
    }

    const purchaseDetails = await prisma.purchase.create({
      data: {
        id: uuidv4(),
        userId,
        courseId,
      },
    });

    return res.status(201).json({ id: purchaseDetails.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
