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
                firstName: body.firstName,
                lastName: body.lastName,
                amount: Number(body.amount),
                email: body.email,
                phoneNumber: body.phoneNumber,
                userId: user.id,
                merchantId: user.merchant.id
            }
        })

        console.log('sending to pylon =======')
        const res = await pylonService.createOrder({
            ...body,
            amount: Number(body.amount),
            walletAddress: user.merchant.walletAddress,
            partnerOrderId: order.id
        }, user)
        console.log('received from pylon =======')
        console.log(res)
        const updatedOrder = await prisma.order.update({
            data: {
                externalId: res.id,
                link: res.uri
            },
            where: {
                id: order.id
            }
        })
        console.log('updated ==========')
        await discordService.send(`${user.merchant.name} created order trackingId: ${order.id}. payment link: ${res.uri}`)
        await smsService.send(order.phoneNumber, `StorefrontPay checkout url: ${res.uri}.`)

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

export async function GET(req: NextRequest) {
    try {
        // TODO: Fix pagination from naive list to date based
        const session = await getServerSession({ req, ...authOptions });
        const page = Number(req.nextUrl.searchParams.get('page') || 1);
        const limit = Number(req.nextUrl.searchParams.get('limit') || 10000); //Leave this as 10000 for now
        const startDate = new Date(req.nextUrl.searchParams.get('startDate') ?? 0);
        const endDate = new Date(req.nextUrl.searchParams.get('endDate') ?? Date.now());

        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
        }

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!session.user.merchantId) {
            return NextResponse.json({ error: "Please process onboard first" }, { status: 400 });
        }

        const orders = await prisma.order.findMany({
            where: {
                merchantId: session.user.merchantId,
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                customer: true
            },
            orderBy: {
                id: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        })

        const count = await prisma.order.count({
            where: {
                merchantId: session.user.merchantId,
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })

        return new Response(JSON.stringify({
            count,
            rows: orders
        }), {
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
