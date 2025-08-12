import { NextResponse } from "next/server";
import { db, auth } from "@/app/libs/firebaseHelpers";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export async function POST(request: Request) {
  // Firebase Auth is client-side; for server-side, you need to pass user info from client
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
    userId, // should be passed from client
  } = body;

  if (!userId) {
    return NextResponse.error();
  }

  try {
    const docRef = await addDoc(collection(db, "listings"), {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
      userId,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
