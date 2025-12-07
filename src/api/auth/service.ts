import { User } from "src/types/user";
import { db } from "../../config/firebase";
import bcrypt from "bcryptjs";

const COLLECTION = "user";

export const createHardcodedUser = async () => {
  const snapshot = await db
    .collection(COLLECTION)
    .where("username", "==", "user")
    .get();
  if (!snapshot.empty) {
    console.log("Hardcoded user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  const docRef = await db.collection(COLLECTION).add({
    username: "user",
    password: hashedPassword,
  });

  console.log("Hardcoded user created with ID:", docRef.id);
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log(`User with ID ${id} not found`);
      return null;
    }

    const data = doc.data();
    if (!data) return null;

    return {
      id: doc.id,
      username: data.username,
    };
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return null;
  }
};
