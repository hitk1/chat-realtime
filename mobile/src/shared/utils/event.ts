import EventEmitter from 'events'

enum eMobileEvents {
    ArrivedMessage = "updateArrivedMessage"
}


const mobileEvent = new EventEmitter()

export { mobileEvent, eMobileEvents }