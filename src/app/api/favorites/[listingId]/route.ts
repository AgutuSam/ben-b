import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebaseHelpers";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface IParams {
  listingId?: string;
  userId?: string; // should be passed from client
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { listingId, userId } = params;

  if (!listingId || !userId) {
    throw new Error("Invalid ID or userId");
  }

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    let favoriteIds = userSnap.exists() ? userSnap.data().favoriteIds || [] : [];
    favoriteIds.push(listingId);
    await updateDoc(userRef, { favoriteIds });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const { listingId, userId } = params;

  if (!listingId || !userId) {
    throw new Error("Invalid ID or userId");
  }

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    let favoriteIds = userSnap.exists() ? userSnap.data().favoriteIds || [] : [];
    favoriteIds = favoriteIds.filter((id: string) => id !== listingId);
    await updateDoc(userRef, { favoriteIds });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
