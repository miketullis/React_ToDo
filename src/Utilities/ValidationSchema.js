
import * as Yup from 'yup'

//ToDo and Category validation using Yup
const toDoSchema = Yup.object().shape({
    "Action": Yup.string().max(50, '50 Characters Max').required(),
    "Description": Yup.string().max(1000, '1000 Characters Max'),
    "CategoryId" : Yup.number().required()
})

const catSchema = Yup.object().shape({
    Name: Yup.string().max(50, '50 Characters Max').required(),
    Description: Yup.string().max(100, '100 Characters Max'),
})


export default toDoSchema;
export {catSchema};