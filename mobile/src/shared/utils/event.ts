import EventEmitter from 'events'

enum eMobileEvents {
    ArrivedMessage = "updateArrivedMessage",
    ReceiveDirect = "receiveDirect"
}


const mobileEvent = new EventEmitter()

export { mobileEvent, eMobileEvents }