// Firebase user and data model helpers
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, addDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "./firebase";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Example: create user document after registration
export async function createUserProfile(uid: string, data: any) {
  await setDoc(doc(db, "users", uid), data);
}

// Example: get user profile
export async function getUserProfile(uid: string) {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
}

// Example: upload image to storage
export async function uploadImage(file: File, path: string) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Add more helpers as needed for listings, reservations, etc.
