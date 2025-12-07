import { Router } from "express";
import productRouter from "./products.route";
import userRouter from "./user.route";
import profileRouter from "./profile.route";

const router = Router();

router.use("/product", productRouter);
router.use("/login", userRouter);
router.use("/profile", profileRouter);

export default router;
