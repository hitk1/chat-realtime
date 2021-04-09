import React from 'react';
import { View } from 'react-native';
import { usePhoneAuth } from '../hooks/phone';
import Home from './Home';
import Splash from './Splash';

const screens: React.FC = () => {
    const { user } = usePhoneAuth()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000)
    })

    // return isLoading ? <Splash /> : ( user ? <Conversations /> : <Home />)
    return isLoading ? <Splash /> : <Home />
}

export default screens;