import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// Define the POST handler for creating an Order
export async function POST(req: NextRequest) {
    const session = await getServerSession({ req, ...authOptions });
    console.log(session);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("session.user:", session.user);

    if (session.role !== "MERCHANT") {
        return NextResponse.json({ error: "Forbidden" }, { status: 401 });
    }
    console.log("session.role:", session.role);
    console.log("Comparison result:", session.role === "MERCHANT")

    const { orderAmount, guestPhone, guestEmail } = await req.json();
    console.log("orderAmount:", orderAmount);
    console.log("userPhone:", guestPhone);
    console.log("userEmail:", guestEmail);

    // Use Prisma to first create a new User(Guest) in the database
    const existingGuest = await prisma.guest.findFirst({
        where: {
            OR: [
                { email: guestEmail },
                { phone: guestPhone },
            ],
        },
    });
    console.log("existingGuest:", existingGuest);

    let guestId;
    if (!existingGuest) {
        const newGuest = await prisma.guest.create({
            data: {
                email: guestEmail,
                phone: guestPhone,
            },
        });
        console.log("newGuest:", newGuest);
        guestId = newGuest.id;
    } else {
        guestId = existingGuest.id;
    }
    // Then, create a new Order linking to the newly created User
    if (session.userId) {
        const userId = Number(session.userId);
        const newOrder = await prisma.order.create({
            data: {
                orderAmount,
                guest: {
                    connect: {
                        id: guestId,
                    },
                },
                merchant: {
                    connect: {
                        id: userId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        // Respond with the newly created Order
        return NextResponse.json(newOrder);
    } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export { POST as default };

