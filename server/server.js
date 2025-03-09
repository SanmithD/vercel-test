import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./db.js";
import postRouter from "./routes/post.route.js";

const app = express();

connectDB();
app.use(
    cors({
      origin: function(origin, callback) {
        const allowedOrigins = [
          process.env.FRONT_URL,
          'http://localhost:5173',
          'https://vercel-test-frontend-delta.vercel.app/'
        ];
        
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          console.log("Blocked by CORS: ", origin);
          callback(null, true); 
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
app.use(express.json());
app.use("/api/info", postRouter);

app.listen(process.env.PORT || 2004, () => {
  console.log(`server running on PORT ${process.env.PORT}`);
});
