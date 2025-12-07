import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://manama-server-client.vercel.app",
  "https://eagle-3d-streaming.web.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

export default app;
