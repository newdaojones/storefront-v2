import { NextRequest } from "next/server";

// Define the POST handler for creating an Order
export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("--------- storefront log ----------");
  console.log(
    JSON.stringify({
      ...body,
      ip: req.ip,
      geo: req.geo,
    })
  );
  console.log("--------- storefront log end ----------");

  try {
    return new Response(JSON.stringify({ success: true }), {
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
