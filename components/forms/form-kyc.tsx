"use client"

import { kycValidationSchema } from "utils/validations";
import SignOut from "../auth/sign-out";
import styles from './form.module.css';
import { FormikProps, useFormik } from 'formik';
import { FormInput } from "../form-input";
import { useAgreement } from "../use/agreement";
import { config } from "config";
import { useEffect } from "react";

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
    signedAgreementId: string;
}

export default function KycForms() {
    const { signedAgreementId, openAgreement } = useAgreement()

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
            signedAgreementId: signedAgreementId || '',
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: kycValidationSchema,
        onSubmit: onSubmitForm
    });

    const { setFieldValue, errors, touched } = kycInfo

    useEffect(() => {
        setFieldValue('signedAgreementId', signedAgreementId)
    }, [setFieldValue, signedAgreementId])

    const onGetAgreementLink = async () => {
        console.log(window.location.origin)
        try {
            const response = await fetch(`${config.PYLON_API_URI}/tos_link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    redirectUri: `${window.location.origin}/agreement-accept`
                }),
            });

            const result = await response.json();

            openAgreement(result.link)
        } catch (err) {

        }
    }

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
                <label className="mt-5 cursor-pointer select-none">
                    <input className="checkbox mr-2" type="checkbox" checked={!!kycInfo.values.signedAgreementId} onClick={() => onGetAgreementLink()} />
                    Click here to review and accept <span className="text-purple-500">Bridge terms of service (TOS)</span>.
                </label>
                {errors?.signedAgreementId && <div className="text-red-500 text-xs">{errors?.signedAgreementId as string}</div>}

                <button className={styles.button} onClick={() => kycInfo.submitForm()}>Submit</button>
                <SignOut />
            </div>
        </div>
    );
}


