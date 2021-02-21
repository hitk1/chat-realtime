import React from 'react'

import { PhoneProvider } from './phone'

const AppProvider: React.FC = ({ children }) => {
    return (
        <PhoneProvider>
            {children}
        </PhoneProvider>
    )
}

export default AppProvider