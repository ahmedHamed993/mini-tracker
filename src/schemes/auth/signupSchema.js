import * as yup from 'yup';
export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password is short')
        .required('Password is required'),
});
