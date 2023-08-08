import { authOptions } from "@/lib/auth";
import { DiscordService } from "@/lib/discord";
import prisma from "@/lib/prisma";
import { PylonService } from "@/lib/pylon";
import { SmsService } from "@/lib/sms";
import { config } from "config";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { CreateOrderData } from "types/order";

const pylonService = PylonService.getInstance();
const discordService = DiscordService.getInstance()
const smsService = SmsService.getInstance();

// Define the POST handler for creating an Order
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession({ req, ...authOptions });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { walletAddress: session.address },
            include: {
                merchant: true,
            },
        })

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!user?.merchant) {
            return NextResponse.json({ error: "User is not associated with merchant" }, { status: 400 });
        }

        const body: CreateOrderData = await req.json();

        const order = await prisma.order.create({
            data: {
                chainId: config.CHAIN_ID,
                currency: 'USDC',
                walletAddress: user.merchant.walletAddress,
                amount: Number(body.amount),
                email: body.email,
                phoneNumber: body.phoneNumber,
                userId: user.id,
                merchantId: user.merchant.id
            }
        })

        const res = await pylonService.createOrder({
            ...body,
            amount: Number(body.amount),
            walletAddress: user.merchant.walletAddress,
            partnerOrderId: order.id
        }, user)

        const updatedOrder = await prisma.order.update({
            data: {
                externalId: res.id,
                link: res.uri
            },
            where: {
                id: order.id
            }
        })

        discordService.send(`${user.merchant.name} created order trackingId: $orderTrackingId. payment link: ${res.uri}`)
        smsService.send(order.phoneNumber, `StorefrontPay checkout url: ${res.uri}.`)

        return new Response(JSON.stringify(updatedOrder), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || 'An error occurred while processing the request.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
