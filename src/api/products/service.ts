import { db } from "../../config/firebase";
import { Product } from "../../types/product";

const COLLECTION = "product";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await db.collection(COLLECTION).get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  console.log("Fetched products:", products);
  return products;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const docRef = await db.collection(COLLECTION).add({
    ...product,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const newProduct = { id: docRef.id, ...product };
  console.log("Added product:", newProduct);
  return newProduct;
};
