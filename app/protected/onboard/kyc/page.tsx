import KycForms from "@/components/forms/form-kyc";
import CommandBar from "@/components/generics/command-bar";

export default function KYC() {

    return (
        <>
            <CommandBar slot1={""} />
            <KycForms />
        </>
    );
}