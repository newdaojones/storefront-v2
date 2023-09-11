import { convertKycStatus } from "@/lib/kycStatus";
import { ChargeStatus, Order, OrderStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { mutationExecute } from "@/lib/apollo";
import { SEND_PAYMENT_SUBSCRIPTION } from "@/lib/graphql";

interface Payload<T> {
  id: string;
  accountId: string;
  type: "account" | "order";
  data: T;
}

interface AccountPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status?: string;
  ssn?: string;
  dob?: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

interface OrderPayload {
  id: string;
  walletAddress: string;
  partnerOrderId?: string;
  email: string;
  phoneNumber: string;
  status: OrderStatus;
  transactionHash?: string;
  feeAmount: number;
  tipAmount: number;
  chargeAmount: number;
  unitAmount?: number;
  chargeStatus?: ChargeStatus;
  chargeCode?: string;
  chargeMsg?: string;
  chargeId?: string;
  last4?: string;
  customer?: AccountPayload;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: Payload<any> = await request.json();
    console.log("received hook", body);

    if (body.type === "account") {
      await accountWebhookHandler(body);
    } else if (body.type === "order") {
      const order = await orderWebhookHandler(body);

      return new Response(JSON.stringify(order || {}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response();
  } catch (error) {
    console.error("Error submitting kyc", error);

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const accountWebhookHandler = async ({ id, data }: Payload<AccountPayload>) => {
  const status = convertKycStatus(data.status);
  await prisma.user.update({
    where: {
      externalId: id,
    },
    data: {
      status,
    },
  });
};

const orderWebhookHandler = async ({
  id,
  accountId,
  data,
}: Payload<OrderPayload>) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      customer: true,
    },
  });

  if (!order) {
    return;
  }

  const updateOrderData: Partial<Order> = {
    status: data.status,
    txHash: data.transactionHash || null,
    serviceFee: data.feeAmount,
    tipAmount: data.tipAmount,
    chargeAmount: data.chargeAmount,
    unitAmount: data.unitAmount || 0,
    chargeId: data.chargeId,
    chargeStatus: data.chargeStatus || null,
    chargeCode: data.chargeCode || null,
    chargeMsg: data.chargeMsg || null,
    last4: data.last4 || null,
  };

  let customer = order.customer;

  if (data.customer && !customer) {
    customer = await prisma.customer.create({
      data: {
        externalId: data.customer.id,
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        phoneNumber: data.customer.phoneNumber,
        ssn: data.customer.ssn,
        dob: data.customer.dob,
        streetAddress: data.customer.streetAddress,
        streetAddress2: data.customer.streetAddress2,
        city: data.customer.city,
        state: data.customer.state,
        postalCode: data.customer.postalCode,
        country: data.customer.country,
      },
    });

    updateOrderData.customerId = customer?.id;
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: updateOrderData,
  });

  await mutationExecute({
    mutation: SEND_PAYMENT_SUBSCRIPTION,
    variables: {
      id: updatedOrder.merchantId.toString(),
      type: "merchant_order",
      action: "update",
      payload: {
        ...updatedOrder,
        customer,
      },
    },
  });
};
