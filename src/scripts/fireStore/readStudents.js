import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function readStudents(collectionName) {
  const reference = collection(database, collectionName);
  const q = query(reference, where("isTeacher", "==", false));
  const spanshot = await getDocs(q);
  const result = spanshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return result;
}
