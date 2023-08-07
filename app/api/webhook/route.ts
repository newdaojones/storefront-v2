import { convertKycStatus } from "@/lib/kycStatus";

export async function POST(request: Request): Promise<Response> {
  try {
    // Parse request body
    const body = await request.json();
    console.log('received hook', body)

    if (body.type === 'account') {
      accountWebhookHandler(body)
    } else if (body.type === 'order') {
      // orderWebhookHandler(body)
    }

    return new Response();
  } catch (error) {
    console.error('Error submitting kyc', error);

    return new Response(JSON.stringify({ error: 'An error occurred while processing the request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const accountWebhookHandler = async ({ id, data }: any) => {
  const status = convertKycStatus(data.status)
  await prisma?.user.update({
    where: {
      externalId: id
    },
    data: {
      status
    }
  })
}
