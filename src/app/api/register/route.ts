import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, createUserProfile } from "@/app/libs/firebaseHelpers";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await createUserProfile(user.uid, { email, name });
    return NextResponse.json({ uid: user.uid, email, name });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
