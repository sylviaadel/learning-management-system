import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createFile(collectionName, id, data) {
  const reference = collection(database, collectionName, id, "files");
  const document = await addDoc(reference, data);
  const result = document.id;

  return result;
}
