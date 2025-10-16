import React, { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { selectUserDetails } from '../../redux/userSlice'
import Cookies from 'js-cookie'

const RedirectAuthenticated: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const { loggedIn } = useAppSelector(selectUserDetails)
    const token = Cookies.get('access_token') ?? null
    useEffect(() => {
        if (loggedIn && token) {
            navigate('/dashboard', { replace: true })
        }
    }, [loggedIn, token, navigate])

    if (loggedIn && token) {
        // You can also optionally return null while the redirect happens
        return null
    }

    return <>{children}</>
}

export default RedirectAuthenticated
