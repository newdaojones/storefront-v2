"use client"

import { kycValidationSchema } from "utils/validations";
import SignOut from "../auth/sign-out";
import styles from './form.module.css';
import { FormikProps, useFormik } from 'formik';
import { FormInput } from "../form-input";

interface KycIndividual {
    companyName: string;
    firstName: string;
    lastName: string;
    dob: string;
    ssn: string;
    phoneNumber: string;
    email: string;
    streetAddress: string;
    streetAddress2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
}

export default function KycForms() {
    const onSubmitForm = async (values: KycIndividual) => {
        try {
            const response = await fetch('/api/kyc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                // Handle successful submission
                console.log('KYC Form successfully submitted:', result);
            } else {
                // Handle error from the API
                console.error('Error submitting KYC Form:', result);
            }
        } catch (error) {
            // Handle error while making the request
            console.error('Error submitting KYC Form:', error);
        }
    }

    const kycInfo = useFormik<KycIndividual>({
        initialValues: {
            companyName: '',
            firstName: '',
            lastName: '',
            dob: '',
            ssn: '',
            phoneNumber: '',
            email: '',
            streetAddress: '',
            streetAddress2: '',
            postalCode: '',
            city: '',
            state: '',
            country: 'USA',
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: kycValidationSchema,
        onSubmit: onSubmitForm
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.formHeader}>
                    <h2 className={styles.title}>Owner KYC Form</h2>
                </div>
                <FormInput {...kycInfo} field="companyName" label="Company Name" />
                <div className="flex gap-2">
                    <FormInput {...kycInfo} field="firstName" label="First Name" />
                    <FormInput {...kycInfo} field="lastName" label="Last Name" />
                </div>
                <div className="flex gap-2">
                    <FormInput {...kycInfo} field="email" label="Email" type="email" />
                    <FormInput {...kycInfo} field="phoneNumber" label="Phone Number" />
                </div>
                <div className="flex gap-2">
                    <FormInput {...kycInfo} field="dob" label="Date of Birthday" />
                    <FormInput {...kycInfo} field="ssn" label="SSN" />
                </div>
                <div className="flex gap-2">
                    <FormInput {...kycInfo} field="streetAddress" label="Street Address" />
                    <FormInput {...kycInfo} field="streetAddress2" label="Unit" />
                </div>
                <div className="flex gap-2">
                    <FormInput {...kycInfo} field="city" label="City" />
                    <FormInput {...kycInfo} field="state" label="State" />
                </div>
                <div className="flex gap-2">
                    <FormInput {...kycInfo} field="postalCode" label="Postal Code" />
                    <FormInput {...kycInfo} field="country" label="Country" disabled />
                </div>
                <button className={styles.button} onClick={() => kycInfo.submitForm()}>Submit</button>
                <SignOut />
            </div>
        </div>
    );
}


