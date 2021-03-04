import * as yup from 'yup'

const itemValidation = yup.object().shape({
    itemname: yup
        .string()
        .required('Text is required'),
    itemcostperday: yup 
        .number()
        .required('Cost is required'),
    itemdescription: yup
        .string()
        .required('Text is required'),
    numberofdaysrented: yup
        .number()
        .required('Number of days required'), 
})

export default itemValidation