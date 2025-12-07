import { Router } from "express";
import { getUserById } from "../api/auth/service";
import jwt from "jsonwebtoken";

const profileRouter = Router();

const JWT_SECRET = process.env.JWT || "supersecretkey";

profileRouter.get("/", async (req, res) => {
  try {
    const token = req.cookies["eagle-hashed-cookie"];
    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    };
    if (!decoded) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized: Invalid token" });
    }

    const user = await getUserById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.status(200).json({ status: "success", user });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

profileRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("eagle-hashed-cookie", {
      httpOnly: true,
      secure: true,
      sameSite: "none", 
      path: "/",        
    });

    return res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});



export default profileRouter;
