import express from "express";
import authRouter from "./routes/AuthRouter";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
