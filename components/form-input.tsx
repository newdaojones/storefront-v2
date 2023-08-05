import { FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface Props extends FormikProps<any> {
  field: string;
  label?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute
}

export function FormInput({ type, values, errors, touched, field, label, disabled, setFieldValue, setFieldTouched }: Props) {
  return (
    <div className="w-full">
      <input
        className="pl-4 pr-4 pt-2 pb-2 w-full rounded"
        type={type}
        placeholder={label}
        value={values[field]}
        disabled={disabled}
        onChange={(e) => setFieldValue(field, e.target.value)}
        onBlur={() => setFieldTouched(field)}
      />
      {errors[field] && touched[field] && <div className="text-red-500 text-xs">{errors[field] as string}</div>}
    </div>
  );
}
