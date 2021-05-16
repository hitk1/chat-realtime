import React from 'react'
import { AppStateProvider } from './appState'

import { PhoneProvider } from './phone'
import { SocketProvider } from './socket'

const AppProvider: React.FC = ({ children }) => {
    return (
        <AppStateProvider>
            <PhoneProvider>
                <SocketProvider>
                    {children}
                </SocketProvider>
            </PhoneProvider>
        </AppStateProvider>
    )
}

export default AppProvider