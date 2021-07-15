import { UpdateStatusMessage } from "../../../../screens/App/Contact/services/UpdateStatusMessage"

export const onNotifyReceiveDirect = async ({ message_id: messageId }: { message_id: string }) => {
    const updateStatusMessage = new UpdateStatusMessage()
    await updateStatusMessage.execute(messageId, 1)
}