import * as yup from 'yup';

export const shareTodoSchema = yup.object().required().shape({
    email: yup.string().email().required(),
    name: yup.string().min(3).required() //regex + dlzka
})