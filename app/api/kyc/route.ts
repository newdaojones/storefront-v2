import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse, next: any) {
    try {
        const response = await fetch('https://test.checkout.mybackpack.app/api/partners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle role assignment on success
            // req.user.role = "MERCHANT";
            res.status(200).json(data);
            console.log("It worked", data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
}
