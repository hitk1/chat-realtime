import { eMobileEvents, mobileEvent } from '../../../../shared/utils/event'
import { IDirectArrivedResponseData } from '../../interfaces'

export const onDirectArrived = ({ key }: IDirectArrivedResponseData) => {

    mobileEvent.emit(eMobileEvents.ArrivedMessage, key)
}