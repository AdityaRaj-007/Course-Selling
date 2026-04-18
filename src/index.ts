import express from "express";
import authRouter from "./routes/AuthRouter";
import courseRouter from "./routes/CourseRouter";
import lessonRouter from "./routes/LessonRouter";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/courses", authMiddleware, courseRouter);
app.use("/lessons", authMiddleware, lessonRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
