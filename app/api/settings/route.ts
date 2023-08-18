import prisma from "@/lib/prisma";

export async function GET(request: Request): Promise<Response> {
    try {
        // Fetch the merchant data using Prisma
        const merchant = await prisma.merchant.findFirst();

        // Return the fetched merchant data in the response
        return new Response(JSON.stringify(merchant || {}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching merchant", error);

        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

