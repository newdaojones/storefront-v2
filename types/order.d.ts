export interface CreateOrderData {
  amount: number;
  email: string;
  phoneNumber: string;
  walletAddress?: string;
  partnerOrderId?: number;
}