import React from 'react'
import { StatusBar } from 'react-native'

import Screens from './screens'
import AppProvider from './hooks'

const src: React.FC = () => {
    return (
        <>
            <AppProvider>
                <StatusBar backgroundColor="#000" barStyle="light-content"/>
                <Screens />
            </AppProvider>
        </>
    )
}

export default src