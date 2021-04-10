import api from '../../../../../services/api'

export default async (name: string, phoneNumber: string): Promise<string> => {
    try {
        let response = ''
        const result = await api.post('/users', { name, phoneNumber })

        if (result.status === 200) {
            const { userId }: {userId: string} = result.data

            response = userId
        }

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}