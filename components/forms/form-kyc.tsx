"use client"

import { config } from "config";
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import ClockLoader from 'react-spinners/ClockLoader';
import { kycValidationSchema } from "utils/validations";
import SignOut from "../auth/sign-out";
import { FormInput } from "../form-input";
import Container from "../generics/container";
import { useAgreement } from "../use/agreement";
import { usePathname, useSearchParams, } from "next/navigation";

interface KycIndividual {
    companyName: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function KycForms() {
    const { data: session, update: sessionUpdate } = useSession()
    let searchParams = useSearchParams();
    const pathname = usePathname()
    const subSignedAgreementId = useMemo(() => searchParams.get('signed_agreement_id'), [searchParams])
    const [loading, setLoading] = useState(false)
    const tosLink = useMemo(() => {
        const link = session?.user.tosLink
        if (!link) {
            return null
        }
        return `${link}&redirect_uri=${location.origin}${pathname}`
    }, [session, pathname])
    const kycLink = useMemo(() => session?.user.kycLink, [session])

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
                        ...result,
                        isNewUser: false,
                    },
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
            email: '',
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: kycValidationSchema,
        onSubmit: onSubmitForm
    });

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
        <Container title={"Storefront KYC Entity Form"}>
            {session?.user.role === 'GUEST' ? (<>
                <div className="flex-1">
                    <FormInput {...kycInfo} field="companyName" label="Company Name" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput {...kycInfo} field="firstName" label="First Name" />
                        <FormInput {...kycInfo} field="lastName" label="Last Name" />
                    </div>
                    <FormInput {...kycInfo} field="email" label="Email" type="email" />
                </div>
                <button className="w-full rounded-md text-notpurple shadow-lg bg-purps p-2 hover:bg-ualert" onClick={() => kycInfo.submitForm()}>Submit</button>
            </>
            ) : <>
                <>
                    {session?.user.status === 'VERIFIED' ? (
                        <div className="text-center">Your KYC Has Been Successfully Verified</div>
                    ) : (
                        <div className="flex-1 w-full flex flex-col">
                            <div className="flex-1 flex flex-col justify-end">
                                {tosLink && kycLink ? (
                                    <>
                                        {subSignedAgreementId ?
                                            <a className="w-full grid-col-1 rounded-md bg-purps p-2 hover:bg-ualert text-center" href={kycLink} target="_blank">Process KYB</a> :
                                            <a className="w-full grid-col-1 rounded-md bg-purps p-2 hover:bg-ualert text-center" href={tosLink}>Accept Terms Of Service</a>
                                        }
                                    </>
                                ) : (
                                    <button className="w-full grid-col-1 rounded-md bg-purps p-2 hover:bg-ualert" onClick={() => processKyc()}>Process</button>
                                )}
                            </div>
                        </div>
                    )
                    }
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


