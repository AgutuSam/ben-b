import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebaseHelpers";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request: Request) {
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice, userId } = body;

  if (!listingId || !startDate || !endDate || !totalPrice || !userId) {
    return NextResponse.error();
  }

  try {
    const docRef = await addDoc(collection(db, "reservations"), {
      listingId,
      startDate,
      endDate,
      totalPrice,
      userId,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
