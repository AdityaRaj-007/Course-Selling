import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import { v4 as uuidv4 } from "uuid";
import { GlobalError } from "../utils/GlobalError";

export const purchaseCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.body;
    const { userId, role } = req.user!;

    if (!courseId) {
      return next(new GlobalError("Invalid fields", 400));
    }

    if (role !== "STUDENT") {
      return next(
        new GlobalError("Create a student account to buy the course.", 400),
      );
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return next(new GlobalError("Course not found.", 400));
    }

    if (userId === course.instructorId) {
      return next(new GlobalError("You cannot buy your own course.", 400));
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
    return next(new GlobalError("Internal Server Error.", 500));
  }
};
