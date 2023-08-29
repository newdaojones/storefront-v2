"use client"

import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import OrderButtons from "@/components/order/buttons";
import CreateOrder from "@/components/order/order-form";
import Agent from "@/components/widgets/agent";
import Shortcuts from "@/components/widgets/shortcuts";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateOrderData } from "types/order";
import { createOrderValidationSchema } from "utils/validations";

export default function Orders() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);
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
            firstName: '',
            lastName: '',
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
            firstName: '',
            lastName: '',
        }, false)
    };

    return (
        <div className="relative w-screen h-screen">
            <Container
                title={"Orders"}
                footer={<OrderButtons
                    onSubmit={createOrderInfo.submitForm}
                    onClear={handleClear}
                    isOrderValid={createOrderInfo.isValid}
                />
                }>
                <CreateOrder formProps={createOrderInfo} />
            </Container>

            <CommandBar
                slot1={'Shortcuts'}
                slot2={'Agent'}
                changeWidget={setActiveWidget}
            />

            {activeWidget === 'Shortcuts' && <Widget title="Shortcuts"><Shortcuts viewType={"orders"} /></Widget>}
            {activeWidget === 'Agent' && <Widget title="Agent"><Agent viewType={"orders"} /></Widget>}

        </div>
    )
}