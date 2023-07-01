import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, publicKey } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        email: email,
        phone: "",
        publicKey: await hash(publicKey, 10),
        role: "MERCHANT",
      },
    });
    return NextResponse.json(user);
  }
}
