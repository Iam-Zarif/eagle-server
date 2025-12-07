import  bcrypt  from 'bcryptjs';

const COLLECTION = "user";
import { User } from "src/types/user";
import { db } from "../../config/firebase";


export const validateUser = async (username: string, password: string) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where("username", "==", username)
    .get();
  if (snapshot.empty) {
    console.log("User not found in Firestore");
    return null;
  }

  const userDoc = snapshot.docs[0];
  const user = userDoc.data() as User;

  if (!user.password) {
    console.log("User password missing");
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Password mismatch");
    return null;
  }

  console.log("User validated successfully:", user.username);
  return { id: userDoc.id, username: user.username };
};