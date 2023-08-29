export interface CreateOrderData {
  amount: number;
  email: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  walletAddress?: string;
  partnerOrderId?: number;
}
