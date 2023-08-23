import { FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";
import DatePicker from "react-datepicker";
import PhoneInput from 'react-phone-number-input';

type FormInputType = HTMLInputTypeAttribute | 'phoneNumber' | 'amount' | 'date';

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

    if (field === 'amount') {
      formattedValue = val.replace(/[^0-9.]/g, '');
      if (formattedValue.length > 0) {
        formattedValue = parseFloat(formattedValue).toFixed(2);
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
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, 5);
      }
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

    case 'date':
      inputComponent = (
        <DatePicker
          className="px-4 py-2 w-full rounded outline-violet-500 bg-stone-50"
          selected={values[field]}
          showMonthDropdown={true}
          showYearDropdown={true}
          placeholderText="Date of Birth"
          openToDate={new Date("1993/09/28")}
          onBlur={() => setFieldTouched(field, true)}
          onChange={(date) => setFieldValue(field, date)}
        />
      )
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

