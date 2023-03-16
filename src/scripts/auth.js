import { createUserWithEmailAndPassword } from "@firebase/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "./firebaseSetup";

export async function createAccount(email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    result = { status: true, payload: data.user.uid, message: "Created!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
export async function login(email, password) {}
export async function recoverAccount(email) {}
