import { ValidationError } from 'yup'

interface IValidationErrors{
    [key: string]: string,
}

export default function getValidationErrors(err: ValidationError): IValidationErrors {
    let validationErrors: IValidationErrors = {}

    err.inner.forEach(item => validationErrors[item.path || ''] = item.message )

    return validationErrors
}