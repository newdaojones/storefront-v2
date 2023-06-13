"use client"

import { useState } from 'react';

export default function KycIndividual() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [ssnOrTaxId, setSsnOrTaxId] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [taxCountry, setTaxCountry] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [docsAttachments, setDocsAttachments] = useState<File | null>(null);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Handle form data here
        console.log({
            firstName,
            lastName,
            phone,
            email,
            address1,
            address2,
            city,
            state,
            zipCode,
            ssnOrTaxId,
            dateOfBirth,
            taxCountry,
            docsAttachments,
        });
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="rounded shadow-md max-w-md w-full overflow-hidden p-6 bg-white mx-auto">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="SSN or Tax ID"
                            value={ssnOrTaxId}
                            onChange={(e) => setSsnOrTaxId(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Tax Country"
                            value={taxCountry}
                            onChange={(e) => setTaxCountry(e.target.value)}
                        />
                    </div>

                    <hr className="my-4" />

                    <input
                        type="text"
                        placeholder="Address 1"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address 2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                    </div>

                    <input
                        type="file"
                        placeholder="Attachments"
                        onChange={(e) => {
                            if (e.target.files) {
                                setDocsAttachments(e.target.files[0]);
                            }
                        }}
                    />

                    <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
