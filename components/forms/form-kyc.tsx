"use client"

import { useState } from "react";
import SignOut from "../auth/sign-out";
import BeneficialForm, { KycBeneficial } from "./form-beneficial";

type KycIndividual = {
    formType: 'individual';
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ssnOrTaxId: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
    docsAttachments: File | null;
}

type KycEntity = {
    formType: 'entity';
    entityName: string;
    entityType: string;
    entityTaxId: string;
    entityPhone: string;
    entityEmail: string;
    entityAddress1: string;
    entityAddress2: string;
    entityZipCode: string;
    entityCity: string;
    entityState: string;
    entityCountry: string;
    entityDocsAttachments: File | null;
    beneficials: KycBeneficial[]; // Array of beneficial owners
}

type FormData = KycIndividual | KycEntity;
type FormType = keyof typeof formFields;

const formFields = {
    individual: {
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfBirth: 'Date of Birth',
        ssnOrTaxId: 'SSN or Tax ID',
        phone: 'Phone Number',
        email: 'Email',
        address1: 'Address 1',
        address2: 'Address 2',
        zipCode: 'Zip Code',
        city: 'City',
        state: 'State',
        country: 'Country',
        docsAttachments: 'Documents',
    },
    entity: {
        entityName: 'Entity Name',
        entityType: 'Entity Type',
        entityTaxId: 'Entity Tax ID',
        entityPhone: 'Entity Phone Number',
        entityEmail: 'Entity Email',
        entityAddress1: 'Entity Address 1',
        entityAddress2: 'Entity Address 2',
        entityZipCode: 'Entity Zip Code',
        entityCity: 'Entity City',
        entityState: 'Entity State',
        entityCountry: 'Entity Country',
        entityDocsAttachments: 'Entity Documents',
    },
};

type FormInputProps = {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}

function FormInput({ label, type, value, onChange }: FormInputProps) {
    return (
        <input
            type={type}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

function isKycEntity(data: FormData): data is KycEntity {
    return data.formType === 'entity';
}

export default function KycForms({ type }: { type: FormType }) {
    const initialFormStates: Record<FormType, FormData> = {
        individual: { formType: 'individual', firstName: '', lastName: '', dateOfBirth: '', ssnOrTaxId: '', phone: '', email: '', address1: '', address2: '', zipCode: '', city: '', state: '', country: '', docsAttachments: null },
        entity: { formType: 'entity', entityName: '', entityType: '', entityTaxId: '', entityPhone: '', entityEmail: '', entityAddress1: '', entityAddress2: '', entityZipCode: '', entityCity: '', entityState: '', entityCountry: '', entityDocsAttachments: null, beneficials: [] },
    };

    const [formData, setFormData] = useState<FormData>(initialFormStates[type]);
    const [formType, setFormType] = useState<FormType>(type);

    const addBeneficialOwner = () => {
        setFormData(prevState => addBeneficialOwnerToState(prevState));
    };

    const addBeneficialOwnerToState = (prevState: FormData): FormData => {
        if (isKycEntity(prevState)) {
            const prevStateEntity: KycEntity = prevState;
            const emptyBeneficial: KycBeneficial = {
                formType: 'beneficial',
                beneficialName: '',
                beneficialType: '',
                beneficialTaxId: '',
                beneficialPhone: '',
                beneficialEmail: '',
                beneficialAddress1: '',
                beneficialAddress2: '',
                beneficialZipCode: '',
                beneficialCity: '',
                beneficialState: '',
                beneficialCountry: '',
                beneficialDocsAttachments: null
            };
            const updatedState: KycEntity = {
                ...prevStateEntity,
                beneficials: [...prevStateEntity.beneficials, emptyBeneficial],
            };
            return updatedState;
        }
        return prevState;
    };

    const handleBeneficialOwnerChange = (index: number, data: KycBeneficial) => {
        setFormData(prevState => updateBeneficialOwnerInState(prevState, index, data));
    };

    const updateBeneficialOwnerInState = (prevState: FormData, index: number, data: KycBeneficial): FormData => {
        if (isKycEntity(prevState)) {
            const beneficialsCopy = [...prevState.beneficials];
            beneficialsCopy[index] = data;
            return { ...prevState, beneficials: beneficialsCopy };
        }
        return prevState;
    };

    const removeBeneficialOwner = (index: number) => {
        setFormData(prevState => removeBeneficialOwnerFromState(prevState, index));
    };

    const removeBeneficialOwnerFromState = (prevState: FormData, index: number): FormData => {
        if (isKycEntity(prevState)) {
            const beneficialsCopy = [...prevState.beneficials];
            beneficialsCopy.splice(index, 1);
            return { ...prevState, beneficials: beneficialsCopy };
        }
        return prevState;
    };


    const handleInputChange = (key: keyof FormData, value: string) => {
        if (formData.hasOwnProperty(key)) {
            setFormData({
                ...formData,
                [key]: value,
            } as FormData);
        }
    };

    const handleFormTypeChange = () => {
        setFormType(formType === 'individual' ? 'entity' : 'individual');
        setFormData(initialFormStates[formType]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleBeneficialFormDelete = (index: number) => {
        removeBeneficialOwner(index);
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="bg-blue-100 border-purple-900 border-6 shadow-md p-6 rounded-xl max-w-xl w-full overflow-auto h-3/4 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl">{formType.charAt(0).toUpperCase() + formType.slice(1)} KYC Form</h2>
                    <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleFormTypeChange}>Switch to {formType === 'individual' ? 'Entity' : 'Individual'} Form</button>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
                    {Object.keys(formFields[type]).map((field: string) => (
                        <FormInput
                            key={field}
                            label={field}
                            type="text"
                            value={(formData[field as keyof FormData] || "") as string}
                            onChange={(value: string) => handleInputChange(field as keyof FormData, value)}
                        />
                    ))}
                    {isKycEntity(formData) && formData.beneficials.map((beneficial, index) => (
                        <BeneficialForm
                            key={index}
                            initialData={beneficial}
                            onChange={(data) => handleBeneficialOwnerChange(index, data)}
                            onDelete={() => handleBeneficialFormDelete(index)}
                        />
                    ))}
                    {isKycEntity(formData) && <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="button" onClick={addBeneficialOwner}>Add Beneficial Owner</button>}
                    <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Submit</button>
                </form>
                <SignOut />
            </div>
        </div>
    );
}


