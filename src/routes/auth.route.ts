import { Router } from "express";
import { createHardcodedUser } from "../api/auth/service";
import jwt from "jsonwebtoken";
import { validateUser } from "../api/auth/validation";

const userRouter = Router();

const JWT_SECRET = process.env.JWT || "supersecretkey";
const JWT_EXPIRES = 1000 * 60 * 60 * 24; // 1 day in ms

userRouter.post("/", async (req, res) => {
  console.log("Login request received");

  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Missing username or password");
    return res
      .status(400)
      .json({ status: "error", message: "Username and password are required" });
  }

  try {
    await createHardcodedUser();
    console.log("Hardcoded user ensured");

    const user = await validateUser(username, password);
    console.log("Validated user:", user);

    if (!user) {
      console.log("Invalid credentials");
      return res
        .status(401)
        .json({ status: "error", message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("JWT generated:", token);

    res.cookie("eagle-hashed-cookie", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "none", 
      maxAge: JWT_EXPIRES,
    });

    console.log("Cookie set with JWT");

    return res
      .status(200)
      .json({ status: "success", message: "Login successful" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

export default userRouter;
