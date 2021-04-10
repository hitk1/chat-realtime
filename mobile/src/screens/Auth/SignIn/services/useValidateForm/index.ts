import * as Yup from 'yup'

export const useValidateFunctions = () => {
    const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório.'),
        phoneNumber: Yup.string().required('O número de telefone é obrigatório')
    })

    return { schema }
}