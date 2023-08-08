"use client"
// components/CreateOrder.tsx
import Buttons from '@/components/order/cancel-submit';
import OrderHeader from '@/components/order/header';
import { useState } from 'react';
import styles from '../../../components/order/order.module.css';
import { useFormik } from 'formik';
import { createOrderValidationSchema } from 'utils/validations';
import { FormInput } from '@/components/form-input';
import ClockLoader from 'react-spinners/ClockLoader';
import { CreateOrderData } from 'types/order';
import { toast } from 'react-hot-toast';

export default function CreateOrder() {
    const [loading, setLoading] = useState(false);

    const onSubmitForm = async (values: CreateOrderData) => {
        try {
            setLoading(true)
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Created an order successfully')
                handleClear()
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const createOrderInfo = useFormik<CreateOrderData>({
        initialValues: {
            amount: 0,
            email: '',
            phoneNumber: '',
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: createOrderValidationSchema,
        onSubmit: onSubmitForm
    });

    const handleClear = () => {
        createOrderInfo.setValues({
            amount: 0,
            email: '',
            phoneNumber: '',
        }, false)
    };
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <OrderHeader />
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <FormInput {...createOrderInfo} field="amount" label="Amount" type="number" />
                        <FormInput {...createOrderInfo} field="phoneNumber" label="Phone number" type="phoneNumber" />
                        <FormInput {...createOrderInfo} field="email" label="Email" type="email" />
                    </div>
                    <Buttons onSubmit={() => createOrderInfo.handleSubmit()} onCancel={handleClear} isOrderValid={createOrderInfo.isValid} />
                </div>
            </div>
            {loading && (
                <div className="absolute bg-black/20 w-full h-full left-0 top-0 flex flex-col items-center justify-center">
                    <ClockLoader size={40} color='black' />
                    <div className="mt-2">Creating Order...</div>
                </div>
            )}
        </div>
    );
}
