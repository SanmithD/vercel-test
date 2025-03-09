import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./db.js";
import postRouter from "./routes/post.route.js";

const app = express();

connectDB();
app.use(
  cors({
    origin: [process.env.FRONT_URL, 'http://localhost:5173/' ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/info", postRouter);

app.listen(process.env.PORT || 2004, () => {
  console.log(`server running on PORT ${process.env.PORT}`);
});
