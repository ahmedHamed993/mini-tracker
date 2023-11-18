import * as yup from 'yup';
export const addCardSchema = yup.object().shape({
    name: yup
        .string()
        .required('Card Title is required'),
    total: yup
        .string()
        .min(0, 'Total money have to spent must be a positive number')
        .required('Total money have to spen is required'),
    spent: yup.array().of(
        yup.object().shape({
            note: yup
                .string()
                .required("In What you spent this money "),
            value: yup
                .number()
                .typeError("Enter a valid number")
                .min(0,'Money you spent must be a positive number')
                .required("What you spent value is required"),
        })
    ),
});
