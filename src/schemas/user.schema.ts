import * as yup from 'yup';

export const userSchema = yup.object().required().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required() //regex + dlzka
})