import { config } from "config";

// Only exporting POST method as it's the only one we're using here
export async function POST(request: Request): Promise<Response> {
    console.log('POST request received', request);
    try {
        // Parse request body
        const body = await request.json();

        // External KYC API endpoint
        const url = config.PYLON_API_URI;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
                password: config.PYLON_PASSWORD
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const user = await prisma?.user.create(data)
            return new Response(JSON.stringify(user), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || 'An error occurred while processing the request.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
