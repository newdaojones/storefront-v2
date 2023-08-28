import { Order } from "@prisma/client";

export async function fetchLatestOrder(): Promise<Order | null> {
    const response = await fetch('/api/orders/latest');
    if (response.ok) {
        const json = await response.json();
        return json.order;
    }
    return null;
}