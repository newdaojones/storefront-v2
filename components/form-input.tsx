import { FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";
import PhoneInput from 'react-phone-number-input';

type FormInputType = HTMLInputTypeAttribute | 'phoneNumber' | 'amount';

interface Props extends FormikProps<any> {
  field: string;
  label?: string;
  disabled?: boolean;
  type?: FormInputType
}

export function FormInput({ type, values, errors, touched, field, label, disabled, setFieldValue, setFieldTouched }: Props) {
  let inputComponent;

  switch (type) {
    case 'phoneNumber':
      inputComponent = (
        <PhoneInput
          className="px-4 py-2 w-full rounded bg-white outline-none"
          defaultCountry="US"
          placeholder={label}
          onBlur={() => setFieldTouched(field, true)}
          value={values[field]}
          onChange={(e) => setFieldValue(field, e)}
        />
      );
      break;
    case 'amount':
      inputComponent = (
        <div className="relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">$</span>
          <input
            className="pl-8 pr-4 py-2 w-full rounded"
            placeholder="0.00"
            onBlur={() => setFieldTouched(field, true)}
            value={values[field] || ""}
            onChange={(e) => setFieldValue(field, e.target.value)}
          />
        </div>
      );
      break;
    default:
      inputComponent = (
        <input
          className="px-4 py-2 w-full rounded"
          type={type}
          placeholder={label}
          value={values[field]}
          disabled={disabled}
          onChange={(e) => setFieldValue(field, e.target.value)}
          onBlur={() => setFieldTouched(field, true)}
        />
      );
      break;
  }

  return (
    <div className="w-full py-4">
      {inputComponent}
      {errors[field] && touched[field] && <div className="text-red-500 text-xs">{errors[field] as string}</div>}
    </div>
  );
}

