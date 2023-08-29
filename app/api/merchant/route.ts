import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PylonService } from "@/lib/pylon";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

const pylonService = PylonService.getInstance();

// Define the POST handler for creating an Order
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    const body = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress: session.address },
      include: {
        merchant: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user?.merchant) {
      return NextResponse.json(
        { error: "User is not associated with merchant" },
        { status: 400 }
      );
    }

    if (
      body.displayName !== undefined &&
      user.merchant.displayName !== body.displayName
    ) {
      await pylonService.updatePartner(
        {
          displayName: body.displayName,
        },
        user
      );
    }

    const updatedMerchant = await prisma.merchant.update({
      where: { id: user.merchant.id },
      data: body,
    });

    return new Response(JSON.stringify(updatedMerchant), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error:
          error.message || "An error occurred while processing the request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
