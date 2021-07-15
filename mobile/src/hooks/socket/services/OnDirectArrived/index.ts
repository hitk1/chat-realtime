import { LinkMessageId } from '../../../../screens/App/Contact/services/LinkMessageId'
import { IDirectArrivedResponseData } from '../../interfaces'

export const onDirectArrived = async (receivedData: IDirectArrivedResponseData) => {
    const { key, message_id } = receivedData
    const linkMessageId = new LinkMessageId()

    await linkMessageId.execute(key, message_id)
}