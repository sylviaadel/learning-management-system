import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function updateItem(collectionName, id, data, subCollection) {
  const reference = doc(database, collectionName, id, subCollection);

  await updateDoc(reference, data);

  return `updated document with id ${id}`;
}
