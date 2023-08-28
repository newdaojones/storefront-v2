export interface CreateOrderData {
  amount: number;
  email: string;
  phoneNumber: string;
  name?: string;
  walletAddress?: string;
  partnerOrderId?: number;
}
