import { ReceiveMessage } from "../../../../screens/App/Contact/services/ReceiveMessage"
import { eMobileEvents, mobileEvent } from "../../../../shared/utils/event"
import { IDirectReceivedData } from "../../interfaces"

export const onReceiveDirect = async (myPhoneNumber: string, data: string) => {
    const receivedMessage = new ReceiveMessage()
    const parsedData = JSON.parse(data) as IDirectReceivedData

    const message = await receivedMessage.execute(myPhoneNumber, parsedData)
    mobileEvent.emit(eMobileEvents.ReceiveDirect, message)
}