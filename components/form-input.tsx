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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let formattedValue = val;

    if (field === 'dob') {
      formattedValue = val.replace(/[^0-9]/g, '');
      if (formattedValue.length >= 4) {
        formattedValue = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4);
      }
      if (formattedValue.length >= 7) {
        formattedValue = formattedValue.slice(0, 7) + '-' + formattedValue.slice(7);
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.slice(0, 10);
      }
    }

    if (field === 'ssn') {
      formattedValue = val.replace(/[^0-9]/g, '');
      if (formattedValue.length >= 3) {
        formattedValue = formattedValue.slice(0, 3) + '-' + formattedValue.slice(3);
      }
      if (formattedValue.length >= 6) {
        formattedValue = formattedValue.slice(0, 6) + '-' + formattedValue.slice(6);
      }
      if (formattedValue.length > 11) {
        formattedValue = formattedValue.slice(0, 11);
      }
    }

    if (field === 'postalCode') {
      formattedValue = val.replace(/[^0-9]/g, '');
    }

    if (field === 'state') {
      formattedValue = val.toUpperCase();
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2);
      }
    }

    setFieldValue(field, formattedValue);
  };

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
          className="px-4 py-2 w-full rounded outline-violet-500 bg-stone-50"
          type="text"
          placeholder={label}
          value={values[field]}
          disabled={disabled}
          onChange={handleInputChange}
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

