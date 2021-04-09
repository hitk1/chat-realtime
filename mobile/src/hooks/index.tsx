import React from 'react'

import { PhoneProvider } from './phone'
import { SocketProvider } from './socket'

const AppProvider: React.FC = ({ children }) => {
    return (
        <PhoneProvider>
            <SocketProvider>
                {children}
            </SocketProvider>
        </PhoneProvider>
    )
}

export default AppProvider