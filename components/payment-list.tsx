"use client"

import { dummyData } from 'utils/dummyData';

type Payment = {
    paymentId: string;
    orderAmount: number;
    orderId: string;
    tip: number;
    networkFee: number;
    serviceFee: number;
    tax: number;
    txHash: string;
    status: string;
    responseCode: number;
    createdAt: string;
    cancelledAt?: string;
};

type Props = {
    payments: Payment[];
};

import { useState } from 'react';

export default function PaymentList() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const payments = dummyData;

    return (
        <div className="flex items-center justify-center h-screen overflow-auto">
            <div className='grid rounded bg-white shadow-md mx-auto max-w-2x1 p-4'>
                <div className="grid grid-cols-4 gap-4 text-center font-bold mb-4">
                    <div>Order ID</div>
                    <div>Total</div>
                    <div>Status</div>
                    <div>Response Code</div>
                </div>
                {payments.map((payment, index) => (
                    <div
                        key={payment.orderId}
                        className="grid grid-cols-4 gap-4 cursor-pointer p-4 bg-gray-100 rounded-md mb-4 text-center"
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                        <div>{payment.orderId}</div>
                        <div>{payment.orderAmount + payment.tip + payment.networkFee + payment.serviceFee + payment.tax}</div>
                        <div>{payment.status}</div>
                        <div>{payment.responseCode}</div>
                        {expandedIndex === index && (
                            <div className="col-span-4 grid grid-cols-2 gap-4 bg-gray-200 p-4 rounded-md mt-4">
                                <div className="text-left">Amount:</div>
                                <div className="text-right">{payment.orderAmount}</div>
                                <div className="text-left">Tip:</div>
                                <div className="text-right">{payment.tip}</div>
                                <div className="text-left">Network Fee:</div>
                                <div className="text-right">{payment.networkFee}</div>
                                <div className="text-left">Service Fee:</div>
                                <div className="text-right">{payment.serviceFee}</div>
                                <div className="text-left">Tax:</div>
                                <div className="text-right">{payment.tax}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}