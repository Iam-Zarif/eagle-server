import { Product } from "../../types/product";

export const validateProduct = (product: Partial<Product>) => {
  const errors: string[] = [];

  if ("name" in product && (!product.name || product.name.trim() === "")) {
    errors.push("Product name is required");
  }

  if ("description" in product && product.description && product.description.length > 1200) {
    errors.push("Description should not exceed 1200 characters");
  }

  if ("price" in product && (typeof product.price !== "number" || product.price < 0)) {
    errors.push("Price must be a non-negative number");
  }

  if ("quantity" in product && (typeof product.quantity !== "number" || product.quantity < 0)) {
    errors.push("Quantity must be a non-negative number");
  }

  if ("status" in product && typeof product.status !== "boolean") {
    errors.push("Status must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
