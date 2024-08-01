import React, { lazy } from 'react'

import { RouteConfigurations } from './types'
import Home from '@/pages/Home'
import OnLeaveRequest from '@/pages/OnLeaveRequest'
import BPMN from '@/pages/BPMN'
import Approve from '@/pages/Approve'
import TaskList from '@/pages/TaskList'

// const Home = lazy(() => import('@/pages/Home'))

const PrivateRoutes: RouteConfigurations[] = [
  { path: '/xin-nghi-phep', element: <OnLeaveRequest /> },
  { path: '/phe-duyet-don-nghi-phep', element: <Approve /> },
  { path: '/task-list', element: <TaskList /> },
  { path: '/bpmn', element: <BPMN /> },

]

export default PrivateRoutes
