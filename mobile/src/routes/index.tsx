import React, { useEffect, useState } from 'react';
import { usePhoneAuth } from '../hooks/phone'

import Splash from '../screens/Splash'
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
    const { user } = usePhoneAuth()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500)
    }, [user])

    return isLoading ? <Splash /> : (user?._id !== undefined ? <AppRoutes /> : <AuthRoutes />)
}

export default Routes;