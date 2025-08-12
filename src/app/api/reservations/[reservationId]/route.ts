import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebaseHelpers";
import { doc, deleteDoc } from "firebase/firestore";

interface IParams {
  reservationId?: string;
  userId?: string; // should be passed from client
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { reservationId, userId } = params;

  if (!reservationId || !userId) {
    throw new Error("Invalid ID or userId");
  }

  try {
    await deleteDoc(doc(db, "reservations", reservationId));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
