import * as _ from 'lodash'
import { authOptions } from "@/lib/auth";
import { PylonService } from "@/lib/pylon";
import { config } from "config";
import { getServerSession } from "next-auth";
import { User } from '@prisma/client';
import { convertKycStatus } from '@/lib/kycStatus';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

const pylonService = PylonService.getInstance()

export async function POST(request: Request): Promise<Response> {

    try {
        const session = await getServerSession({ request, ...authOptions });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const res = await pylonService.createPartner({
            ...body,
            password: config.PYLON_PASSWORD,
        })

        const token = await pylonService.login(res.data.email);

        const merchant = await prisma.merchant.create({
            data: {
                name: body.companyName,
                walletAddress: session.address
            },
        })

        const userData: Partial<User> = {
            externalId: res.data.id,
            role: 'OWNER',
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            ssn: res.data.ssn,
            dob: res.data.dob,
            streetAddress: res.data.streetAddress,
            streetAddress2: res.data.streetAddress2,
            city: res.data.city,
            state: res.data.state,
            postalCode: res.data.postalCode,
            country: res.data.country,
            merchantId: merchant?.id || null,
            token: token,
            status: convertKycStatus(res.data.status),
        }

        const updatedUser = await prisma.user.update({
            where: {
                walletAddress: session?.user.walletAddress
            },
            data: userData
        })

        if (!config.IS_PRODUCTION && updatedUser) {
            pylonService.sandboxApproveAccount(updatedUser)
        }

        return new Response(JSON.stringify({
            ...updatedUser,
            merchant
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

export async function GET(request: Request): Promise<Response> {
    try {
        const session = await getServerSession({ request, ...authOptions });
        const link = await pylonService.getKYCLink(session?.address)
        return new Response(JSON.stringify({ link }), {
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
