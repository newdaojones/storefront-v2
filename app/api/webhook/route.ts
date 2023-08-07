export async function POST(request: Request): Promise<Response> {
  try {
    // Parse request body
    const body = await request.json();
    console.log('received hook', body)

    if (body.type === 'account') {
      orderWebhookHandler(body)
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

const orderWebhookHandler = async ({ id, data }: any) => {
  await prisma?.user.update({
    where: {
      id
    },
    data
  })
}
