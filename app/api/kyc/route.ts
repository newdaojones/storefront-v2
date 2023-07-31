// Only exporting POST method as it's the only one we're using here
export async function POST(request: Request): Promise<Response> {
    console.log('POST request received', request);
    try {
        // Parse request body
        const body = await request.json();

        // External KYC API endpoint
        const url = 'https://test.checkout.mybackpack.app/api/partners';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // Pass the body to the external API
        });

        const data = await response.json();

        if (response.ok) {
            return new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error('Error submitting kyc', error);

        return new Response(JSON.stringify({ error: 'An error occurred while processing the request.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
