import * as yup from 'yup';

export const todoSchema = yup.object().required().shape({
    name: yup.string().min(3).required() //regex + dlzka
})