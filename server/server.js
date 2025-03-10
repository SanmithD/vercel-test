import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./db.js";
import postRouter from "./routes/post.route.js";

const app = express();

connectDB();
app.use(
  cors({
    origin: [ process.env.FRONT_URL || 'https://vercel-test-user.vercel.app' ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/info", postRouter);
app.get('/',(req, res)=>{
    res.send("Hello world");
})

app.listen(process.env.PORT || 2004, () => {
  console.log(`server running on PORT ${process.env.PORT}`);
});
