import type { Request, Response } from "express";
import { prisma } from "../db";

export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({
        error: "Please create an account before purchasing the course.",
      });
    }

    const purchases = await prisma.purchase.findMany({ where: { userId: id } });

    const purchasedCourses = [];

    for (const purchase of purchases) {
      const courseId = purchase.courseId;

      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        return res.status(400).json({ message: "Course not found." });
      }

      const instructor = await prisma.user.findUnique({
        where: { id: course.instructorId },
      });

      if (!instructor) {
        return res.status(400).json({ error: "Instuctor doesn't exists." });
      }
      purchasedCourses.push({
        id: courseId,
        title: course.title,
        instructor: instructor.name,
      });
    }

    return res.status(200).json(purchasedCourses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
