import * as yup from 'yup';

export const kycValidationSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phoneNumber: yup.string().required('Phone Number is required'),
  dob: yup.string().required('Date of Birthday is required'),
  ssn: yup.string().required('SSN is required').matches(/^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/, 'SSN is invalid'),
  country: yup.string().optional(),
  postalCode: yup.string().required('Zip Code is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  streetAddress: yup.string().required('Street Address is required'),
  streetAddress2: yup.string().optional(),
  signedAgreementId: yup.string().required('Required accept agreement')
})

export const createOrderValidationSchema = yup.object().shape({
  amount: yup.number().required('The amount is required').positive().min(1, 'The amount must be greater than $1'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
})