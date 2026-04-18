import express from "express";
import authRouter from "./routes/AuthRouter";
import courseRouter from "./routes/CourseRouter";
import lessonRouter from "./routes/LessonRouter";
import purchaseRouter from "./routes/PurchaseRouter";
import userRouter from "./routes/UserRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/courses", authMiddleware, courseRouter);
app.use("/lessons", authMiddleware, lessonRouter);
app.use("/purchases", authMiddleware, purchaseRouter);
app.use("/users", authMiddleware, userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
