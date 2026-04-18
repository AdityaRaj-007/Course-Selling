import type { Request, Response } from "express";
import { prisma } from "../db";
import { v4 as uuidv4 } from "uuid";

export const addLessons = async (req: Request, res: Response) => {
  try {
    const { title, content, courseId } = req.body;
    const { userId, role } = req.user!;

    if (role !== "INSTRUCTOR") {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return res.status(400).json({ message: "Course not found." });
    }

    if (course.instructorId !== userId) {
      return res
        .status(400)
        .json({ message: "Unauthorized to add lessons for this course." });
    }

    const lessons = await prisma.lesson.create({
      data: {
        id: uuidv4(),
        title,
        content,
        courseId,
      },
    });

    return res.status(201).json({ id: lessons.id, title });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
