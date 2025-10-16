import React, { useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const RedirectAuthenticated: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = Cookies.get('access_token') ?? null
  useEffect(() => {
    if ((pathname === '/login' || pathname === '/register') && token) {
      navigate('/dashboard', { replace: true })
    }
  }, [pathname, token, navigate])

  return <>{children}</>
}

export default RedirectAuthenticated
