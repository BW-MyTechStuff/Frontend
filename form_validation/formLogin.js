import * as yup from 'yup'

const formSchema = yup.object().shape({
    username: yup.string()
        .required('Name must be at least 2 characters'),
    password: yup.string()
        .required('Password must be atleast 2 characters')
})

export default formSchema