import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createLink(collectionName, id, data) {
  const reference = collection(database, collectionName, id, "links");
  const document = await addDoc(reference, data);
  const result = document.id;

  return result;
}
