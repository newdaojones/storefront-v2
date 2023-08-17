import { FormikProps } from "formik";
import { CreateOrderData } from "types/order";
import { FormInput } from "../form-input";

type OrderFormProps = {
    formProps: FormikProps<CreateOrderData>;
};

export default function CreateOrder({ formProps }: OrderFormProps) {
    return (
        <div>
            <div className="grid grid-cols-1 py-2">
                <FormInput {...formProps} field="amount" label="Amount" type="amount" />
                <FormInput {...formProps} field="phoneNumber" label="Phone number" type="phoneNumber" />
                <FormInput {...formProps} field="email" label="Email" type="email" />
            </div>
        </div>
    );
}
