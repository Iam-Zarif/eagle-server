import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/firebase";

const JWT_SECRET = process.env.JWT || "supersecretkey";

interface JwtPayload {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
}

export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["eagle-hashed-cookie"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const userDoc = await db.collection("user").doc(decoded.id).get();
    if (!userDoc.exists) return res.status(401).json({ message: "Unauthorized" });

    req.user = { id: decoded.id, ...userDoc.data() };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
