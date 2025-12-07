import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001" || "https://eagle-3d-streaming.web.app";

app.use(
  cors({
    origin: FRONTEND_URL, 
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
