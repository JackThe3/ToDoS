import * as yup from 'yup';

export const addTaskSchema = yup.object().required().shape({
    title: yup.string().min(3).required(),
    description: yup.string().optional(),
    deadline: yup.date().optional(),
    status: yup.string().default(() => 'in progress'),
    name: yup.string().min(3).required(), // regex + dlzka
})
