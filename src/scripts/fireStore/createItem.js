import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createItem(collectionName, id, data, subCollection) {
  const reference = collection(database, collectionName, id, subCollection);
  const document = await addDoc(reference, data);
  const result = document.id;

  return result;
}
