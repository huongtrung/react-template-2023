import React, { useCallback, useEffect, Suspense } from 'react'
import { Route, RouteProps, Routes, useLocation, useNavigate } from 'react-router-dom'

import { PrivateRoutes, PublicRoutes } from '@/routers'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ROLE } from '@/constants/Constants'

const Navigation = () => {
  const { isSignedIn, role } = useAppSelector(state => state.auth)
  const publicURL = PublicRoutes.map((route) => route.path)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const redirectURL = useCallback(() => {
    const isApprove = (role === ROLE.QLTT || role === ROLE.TP || role === ROLE.GDK)
    if (isSignedIn && role === 'STAFF' && pathname === '/login') return navigate("/xin-nghi-phep")
    if (isSignedIn && role === 'ADMIN' && pathname === '/login') return navigate("/bpmn")
    if (isSignedIn && isApprove && pathname === '/login') return navigate("/phe-duyet-don-nghi-phep")

    if (!isSignedIn && !publicURL.includes(pathname)) return navigate("/login")
  }, [isSignedIn, pathname])

  const routesWillRender = isSignedIn ? PrivateRoutes : PublicRoutes

  useEffect(() => {
    redirectURL()
  }, [redirectURL])

  return (
    <Routes>
      {routesWillRender.map((route: RouteProps, index: number) => <Route key={index} {...route} />)}
    </Routes>
  )
}

export default Navigation