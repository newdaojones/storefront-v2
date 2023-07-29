"use client"

import { useState } from "react";
import SignOut from "../auth/sign-out";
import BeneficialForm, { KycBeneficial } from "./form-beneficial";
import styles from './form.module.css';

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/kyc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
    };

    const handleBeneficialFormDelete = (index: number) => {
        removeBeneficialOwner(index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.formHeader}>
                    <h2 className={styles.title}>{formType.charAt(0).toUpperCase() + formType.slice(1)} KYC Form</h2>
                    <button className={styles.button} onClick={handleFormTypeChange}>Switch to {formType === 'individual' ? 'Entity' : 'Individual'} Form</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.formBody}>
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
                    {isKycEntity(formData) && <button className={styles.button} type="button" onClick={addBeneficialOwner}>Add Beneficial Owner</button>}
                    <button className={styles.button} type="submit">Submit</button>
                </form>
                <SignOut />
            </div>
        </div>
    );
}


