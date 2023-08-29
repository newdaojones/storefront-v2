"use client"

import { config } from "config";
import { useFormik } from 'formik';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ClockLoader from 'react-spinners/ClockLoader';
import { kycValidationSchema } from "utils/validations";
import SignOut from "../auth/sign-out";
import { FormInput } from "../form-input";
import Container from "../generics/container";
import { useAgreement } from "../use/agreement";
import { format } from 'date-fns'

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
    const { data: session, update: sessionUpdate } = useSession()
    const { signedAgreementId, openAgreement } = useAgreement()
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
                    dob: format(new Date(values.dob), 'yyyy-MM-dd'),
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
        <Container title={"Storefront KYC Entity Form"} footer={<button className="w-full rounded-md text-white shadow-lg bg-violet-500 p-2 hover:bg-pink-500" onClick={() => kycInfo.submitForm()}>Submit</button>}>
            {session?.user.role === 'GUEST' ? (<>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <FormInput {...kycInfo} field="companyName" label="Company Name" />
                        <FormInput {...kycInfo} field="firstName" label="First Name" />
                        <FormInput {...kycInfo} field="lastName" label="Last Name" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                        <FormInput {...kycInfo} field="email" label="Email" type="email" />
                        <FormInput {...kycInfo} field="phoneNumber" label="Phone Number" type="phoneNumber" />
                        <FormInput {...kycInfo} field="dob" label="Date of Birth" type="date" />
                        <FormInput {...kycInfo} field="ssn" label="SSN" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                        <FormInput {...kycInfo} field="streetAddress" label="Street Address" />
                        <FormInput {...kycInfo} field="streetAddress2" label="Unit" />
                        <FormInput {...kycInfo} field="city" label="City" />
                        <FormInput {...kycInfo} field="state" label="State" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <FormInput {...kycInfo} field="postalCode" label="Postal Code" />
                        <FormInput {...kycInfo} field="country" label="Country" disabled />
                        <label className="p-2 cursor-pointer select-none">
                            <input className="checkbox mr-2" type="checkbox" checked={!!kycInfo.values.signedAgreementId} onClick={() => onGetAgreementLink()} />
                            Confirm Receipt of ToS <span className=" grid grid-cols-1 lg:grid-cols-1 text-purple-500">Bridge Terms of Servce</span>
                            {errors?.signedAgreementId && <div className="text-red-500 text-xs">{errors?.signedAgreementId as string}</div>}
                        </label>
                    </div>
                </div>
            </>
            ) : <>
                <>
                    {session?.user.status === 'VERIFIED' ? (
                        <div className="text-center">Your KYC Has Been Successfully Verified</div>
                    ) : <>
                        <button className="w-full grid-col-1 rounded-md bg-violet-500 p-2 hover:bg-pink-500" onClick={() => processKyc()}>Process</button>
                    </>}
                </>
            </>}
            <SignOut />
            {loading && (
                <div className="absolute bg-black/20 w-full h-full left-0 top-0 flex flex-col items-center justify-center">
                    <ClockLoader size={40} color='black' />
                    <div className="mt-2">Loading...</div>
                </div>
            )}
        </Container>
    );
}


