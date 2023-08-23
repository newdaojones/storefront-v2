import * as yup from 'yup';

const validStateCodes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

export const kycValidationSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid').lowercase('Email should be in lowercase'),
  phoneNumber: yup.string().required('Phone Number is required'),
  dob: yup.string()
    .required('Date of Birth is required')
    .test('is-adult', 'You must be 18 years or older', (value) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  ssn: yup.string().required('SSN is required').matches(/^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/, 'SSN is invalid'),
  country: yup.string().optional(),
  postalCode: yup.string()
    .required('Zip Code is required')
    .length(5, 'Zip Code should be exactly 5 digits')
    .matches(/^\d+$/, 'Zip Code should contain only numbers'),
  state: yup.string()
    .required('State is required')
    .length(2, 'State should be a 2-letter code')
    .matches(/^[A-Z]{2}$/, 'State should be a 2-letter uppercase code')
    .oneOf(validStateCodes, 'State is invalid'),
  city: yup.string().required('City is required'),
  streetAddress: yup.string().required('Street Address is required'),
  streetAddress2: yup.string().optional(),
  signedAgreementId: yup.string().required('Required accept agreement')
});

export const createOrderValidationSchema = yup.object().shape({
  amount: yup.number().required('The amount is required').positive().min(1, 'The amount must be greater than $1'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
})