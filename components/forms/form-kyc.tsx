"use client"

import { kycValidationSchema } from "utils/validations";
import SignOut from "../auth/sign-out";
import styles from './form.module.css';
import { useFormik } from 'formik';
import { FormInput } from "../form-input";
import { useAgreement } from "../use/agreement";
import { config } from "config";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ClockLoader from 'react-spinners/ClockLoader';
import { toast } from "react-hot-toast";

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
    const { data: session } = useSession()
    const { signedAgreementId, openAgreement } = useAgreement()
    const { update: sessionUpdate } = useSession()
    const [loading, setLoading] = useState(false)

    const onSubmitForm = async (values: KycIndividual) => {
        try {
            setLoading(true)
            const response = await fetch('/api/kyc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    webhook: `${window.location.origin}/api/webhook`
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // Handle successful submission
                sessionUpdate({
                    user: {
                        id: result.id,
                        name: `${result.firstName} ${result.lastName}`,
                        email: result.email,
                        walletAddress: result.walletAddress,
                        status: result.status,
                        image: '',
                        role: result.role,
                        isVerified: result.status === 'VERIFIED',
                        merchant: result.merchant
                    },
                    isNewUser: false,
                })
                toast.success('Submitted successfully')
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
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
        try {
            setLoading(true)
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
            if (response.ok) {
                openAgreement(result.link)
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const processKyc = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/kyc', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (response.ok && result.link) {
                window.open(result.link, '_blank')
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className="flex-1 flex flex-col gap-2">
                    {session?.user.role === 'GUEST' ? (<>
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
                            <FormInput {...kycInfo} field="phoneNumber" label="Phone Number" type="phoneNumber" />
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

                        <button className={styles.button} onClick={() => kycInfo.submitForm()}>Submit</button></>
                    ) : <>
                        <>
                            <div className={styles.formHeader}>
                                <h2 className={styles.title}>KYC Process</h2>
                            </div>
                            {session?.user.status === 'VERIFIED' ? (
                                <div className="text-center">it&apos;s verified your KYC successfully</div>
                            ) : <>
                                <div className="flex-1"></div>
                                <button className={styles.button} onClick={() => processKyc()}>Process</button>
                            </>}
                        </>
                    </>}
                </div>
                <SignOut />
                {loading && (
                    <div className="absolute bg-black/20 w-full h-full left-0 top-0 flex flex-col items-center justify-center">
                        <ClockLoader size={40} color='black' />
                        <div className="mt-2">Loading...</div>
                    </div>
                )}
            </div>
        </div >
    );
}


