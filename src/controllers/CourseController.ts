import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;
    const { userId, role } = req.user!;

    if (role !== "INSTRUCTOR") {
      return res.status(403).json({
        message: "Unauthorized, only INSTRUCTORS can create courses.",
      });
    }

    const courseDetails = await prisma.course.create({
      data: {
        id: uuidv4(),
        title,
        description,
        price,
        instructorId: userId,
      },
    });

    return res.status(201).json({
      courseId: courseDetails.id,
      title: courseDetails.title,
      price: courseDetails.price,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({});

    const coursesDetails = courses.map((course) => {
      return {
        id: course.id,
        title: course.title,
        price: course.price,
        instructorId: course.instructorId,
      };
    });

    return res.status(200).json({ coursesDetails });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCourseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return res.status(400).json({ message: "Course not found." });
    }

    const lessons = await prisma.lesson.findMany({ where: { courseId: id } });

    return res.status(200).json({
      id: course.id,
      title: course.title,
      description: course.description,
      lessons,
      price: course.price,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editCourseDetails = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;
    const { id } = req.params;
    const { userId, role } = req.user!;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid course id." });
    }

    if (role !== "INSTRUCTOR") {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const courseDetails = await prisma.course.findUnique({ where: { id } });

    if (!courseDetails) {
      return res.status(400).json({ message: "Course not found." });
    }

    if (courseDetails.instructorId !== userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized to edit course details." });
    }

    courseDetails.title = title;
    courseDetails.description = description;
    courseDetails.price = price;

    const newCourseData = await prisma.course.update({
      where: { id },
      data: { description, title, price, updatedAt: new Date() },
    });

    return res.status(200).json({ id, description, title, price });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Interval Server Error." });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user!;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    if (role != "INSTRUCTOR") {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return res.status(400).json({ message: "Invalid course id." });
    }

    if (course.instructorId !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorzied to delete course." });
    }

    await prisma.course.delete({ where: { id } });

    return res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getCourseLessons = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    if (!courseId || Array.isArray(courseId)) {
      return res.status(400).json({ error: "Invalid field value." });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return res.status(400).json({ message: "Course not found." });
    }

    const lessons = await prisma.lesson.findMany({ where: { courseId } });

    const lessonDetails = lessons.map((lesson) => {
      return {
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
      };
    });

    return res.status(200).json(lessonDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
