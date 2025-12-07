import { Router } from "express";
import { addProduct, getProducts } from "../api/products/service";
import { verifyAuth } from "../middleware/auth";
import { validateProduct } from "../api/products/validation";
import { db } from "../config/firebase";

const router = Router();

router.use(verifyAuth);

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

router.post("/", async (req, res) => {
  const { isValid, errors } = validateProduct(req.body);
  if (!isValid) {
    return res
      .status(400)
      .json({ status: "error", message: "Validation failed", errors });
  }

  const newProduct = await addProduct(req.body);
  res.status(201).json(newProduct);
});

router.put("/", async (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Product id is required" });
  }

  const { isValid, errors } = validateProduct(req.body);
  if (!isValid) {
    return res
      .status(400)
      .json({ status: "error", message: "Validation failed", errors });
  }

  try {
    const docRef = db.collection("product").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    await docRef.update({
      ...req.body,
      updatedAt: Date.now(),
    });

    const updatedProduct = { id, ...doc.data(), ...req.body };
    res.json({ status: "success", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Product id is required" });
  }

  try {
    const docRef = db.collection("product").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    await docRef.delete();
    res.json({ status: "success", message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

export default router;
