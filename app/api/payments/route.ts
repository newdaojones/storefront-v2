import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { from, to } = await req.json();
    const payments = await prisma.payment.findMany({
        where: {
            createdAt: {
                gte: new Date(from), //gte = greater than or equal to
                lte: new Date(to), //lte = less than or equal to
            }
        },
        include: {
            order: true,
            user: true,
            merchant: true,
            gateway: true,
        }
    });

    return NextResponse.json(payments);
}