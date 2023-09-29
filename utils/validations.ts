import * as yup from "yup";

const validStateCodes = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const kycValidationSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid")
    .lowercase("Email should be in lowercase"),
});

export const createOrderValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .required("The amount is required")
    .positive()
    .min(1, "The amount must be greater than $1")
    .test(
      "is-decimal",
      "Invalid decimal",
      (value: { toString: () => string } | null | undefined) => {
        if (value !== undefined && value !== null) {
          return (value.toString().split(".")[1] || []).length <= 2;
        }
        return true;
      }
    ),
  phoneNumber: yup.string().required("Phone Number is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

export const datePickerSchema = yup.object().shape({
  startDate: yup
    .string()
    .required("Start Date is required")
    .matches(/^\d{2}-\d{2}-\d{2}$/, "Date is invalid"),
  endDate: yup
    .string()
    .required("End Date is required")
    .matches(/^\d{2}-\d{2}-\d{2}$/, "Date is invalid"),
});
