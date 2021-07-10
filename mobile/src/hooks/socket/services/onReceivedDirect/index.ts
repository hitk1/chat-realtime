import { ReceiveMessage } from "../../../../screens/App/Contact/services/ReceiveMessage"
import { IDirectReceivedData } from "../../interfaces"

export const onReceiveDirect = async (myPhoneNumber: string, data: string) => {
    const receivedMessage = new ReceiveMessage()
    const parsedData = JSON.parse(data) as IDirectReceivedData

    const t = await receivedMessage.execute(myPhoneNumber, parsedData)
    console.log('recebida', t)
}