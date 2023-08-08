import { FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";
import PhoneInput from 'react-phone-number-input';

type FormInputType = HTMLInputTypeAttribute | 'phoneNumber'

interface Props extends FormikProps<any> {
  field: string;
  label?: string;
  disabled?: boolean;
  type?: FormInputType
}

export function FormInput({ type, values, errors, touched, field, label, disabled, setFieldValue, setFieldTouched }: Props) {
  if (type === 'phoneNumber') {
    return (
      <div className="w-full">
        <PhoneInput
          className="pl-4 pr-4 pt-2 pb-2 w-full rounded bg-white outline-none"
          defaultCountry="US"
          placeholder={label}
          onBlur={() => setFieldTouched(field, true)}
          value={values[field]}
          onChange={(e) => setFieldValue(field, e)}
        />
        {errors[field] && touched[field] && <div className="text-red-500 text-xs">{errors[field] as string}</div>}
      </div>
    )
  }

  return (
    <div className="w-full">
      <input
        className="pl-4 pr-4 pt-2 pb-2 w-full rounded"
        type={type}
        placeholder={label}
        value={values[field]}
        disabled={disabled}
        onChange={(e) => setFieldValue(field, e.target.value)}
        onBlur={() => setFieldTouched(field, true)}
      />
      {errors[field] && touched[field] && <div className="text-red-500 text-xs">{errors[field] as string}</div>}
    </div>
  );
}
