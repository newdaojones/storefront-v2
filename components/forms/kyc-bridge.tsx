"use client"

import React, { useState } from 'react';
import { BridgeKycFormData } from './bridge';
import styles from './form.module.css';


type BridgeKycFormErrors = { [K in keyof BridgeKycFormData]?: string };

export default function BridgeKyc() {
    const [formData, setFormData] = useState<BridgeKycFormData>({
        email: '',
        password: '',
        companyName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        ssn: '',
        dob: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        signedAgreementId: '',
    });

    const [formErrors, setFormErrors] = useState<BridgeKycFormErrors>({});

    const validateField = (field: keyof BridgeKycFormData, value: string): string | undefined => {
        switch (field) {
            case 'email':
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value) ? undefined : 'Please enter a valid email';
            case 'password':
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
                return passwordRegex.test(value) ? undefined : 'Password must contain at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character';
            case 'phoneNumber':
                const phoneNumberRegex = /^\+[1-9]\d{1,14}$/;
                return phoneNumberRegex.test(value) ? undefined : 'Phone number should be in the format "+12223334444"';
            case 'ssn':
                const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
                return ssnRegex.test(value) ? undefined : 'SSN should be in the format "111-22-3333"';
            case 'dob':
                const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
                return dobRegex.test(value) ? undefined : 'Date of birth should be in the format "yyyy-mm-dd"';
            case 'country':
                const countryRegex = /^[A-Z]{3}$/;
                return countryRegex.test(value) ? undefined : 'Country code should be a three-letter alpha-3 code as defined in the ISO 3166-1 spec';
            default:
                return value ? undefined : 'This field is required';
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: validateField(name as keyof BridgeKycFormData, value) });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newFormErrors: BridgeKycFormErrors = {};
        Object.entries(formData).forEach(([field, value]) => {
            const error = validateField(field as keyof BridgeKycFormData, value);
            if (error) newFormErrors[field as keyof BridgeKycFormData] = error;
        });

        if (Object.values(newFormErrors).length > 0) {
            setFormErrors(newFormErrors);
            return; // Don't submit the form if there are errors
        }

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
                console.log('KYC Form successfully submitted:', result);
            } else {
                console.error('Error submitting KYC Form:', result);
            }
        } catch (error) {
            console.error('Error submitting KYC Form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.formHeader}>
                    <h2 className={styles.title}>Bridge KYC Form</h2>
                </div>
                <form onSubmit={handleSubmit} className={styles.formBody}>
                    {Object.entries(formData).map(([field, value]) => (
                        <div key={field}>
                            <label>{field}</label>
                            <input
                                name={field}
                                type={field === 'password' ? 'password' : 'text'} // Use 'password' type for the password field
                                value={value}
                                onChange={handleChange}
                                className={formErrors[field as keyof BridgeKycFormData] ? 'errorInput' : ''}
                            />
                            {formErrors[field as keyof BridgeKycFormData] && (
                                <div className="error">{formErrors[field as keyof BridgeKycFormData]}</div>
                            )}
                        </div>
                    ))}
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
        </div>
    );
};
