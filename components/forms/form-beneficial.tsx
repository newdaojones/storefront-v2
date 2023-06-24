"use client"

import { useEffect, useState } from "react";

export type KycBeneficial = {
    formType: 'beneficial';
    beneficialName: string;
    beneficialType: string;
    beneficialTaxId: string;
    beneficialPhone: string;
    beneficialEmail: string;
    beneficialAddress1: string;
    beneficialAddress2: string;
    beneficialZipCode: string;
    beneficialCity: string;
    beneficialState: string;
    beneficialCountry: string;
    beneficialDocsAttachments: File | null;
}

const formFields = {
    beneficial: [
        'beneficialName',
        'beneficialType',
        'beneficialTaxId',
        'beneficialPhone',
        'beneficialEmail',
        'beneficialAddress1',
        'beneficialAddress2',
        'beneficialZipCode',
        'beneficialCity',
        'beneficialState',
        'beneficialCountry',
        'beneficialDocsAttachments',
    ],
};

type BeneficialFormProps = {
    initialData?: KycBeneficial;
    onChange: (data: KycBeneficial) => void;
    onDelete: () => void;
};

type FormInputProps = {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}

function FormInput({ label, type, value, onChange }: FormInputProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="mb-2">{label}</label>
            <input
                id={label}
                type={type}
                placeholder={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default function BeneficialForm({ initialData, onChange, onDelete }: BeneficialFormProps) {
    const [formData, setFormData] = useState<KycBeneficial>(initialData || {
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
    });

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    const handleInputChange = (key: keyof KycBeneficial, value: string | File | null) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    return (
        <form>
            {formFields.beneficial.map((field: string) => (
                <FormInput
                    key={field}
                    label={field}
                    type="text"
                    value={formData[field as keyof KycBeneficial] as string}
                    onChange={(value: string) => handleInputChange(field as keyof KycBeneficial, value)}
                />
            ))}
            <button type="button" onClick={onDelete}>Delete</button>
        </form>
    );
}
