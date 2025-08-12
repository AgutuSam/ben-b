import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebaseHelpers";
import { doc, deleteDoc } from "firebase/firestore";

interface IParams {
  listingId?: string;
  userId?: string; // should be passed from client
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { listingId, userId } = params;

  if (!listingId || !userId) {
    throw new Error("Invalid ID or userId");
  }

  try {
    await deleteDoc(doc(db, "listings", listingId));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
