import React, { useState } from 'react'
import {
  FaBars,
  FaHome,
  FaUser,
  FaCog,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import SidebarItem from './SidebarItem'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logoutUser, selectUserDetails } from '../../redux/userSlice'
import persistStore from 'redux-persist/es/persistStore'
import store from '../../redux/store'
import { BsBuilding } from 'react-icons/bs'

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const user = useAppSelector(selectUserDetails)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  const toggleMenu = (key: string) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLogout = () => {
    persistStore(store).purge() // clears persisted state
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="flex h-[100vh]">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 250 : 60 }}
        className="bg-primary text-white shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-blue-700">
            {isSidebarOpen && (
              <h2 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                {user?.first_name} {user?.last_name}
              </h2>
            )}
            <button onClick={toggleSidebar}>
              <FaBars className="text-white" />
            </button>
          </div>

          <nav className="p-2 flex-1 overflow-hidden">
            <SidebarItem
              icon={<FaHome />}
              label="Home"
              to="/"
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<BsBuilding/>}
              label="Institutions"
              isSidebarOpen={isSidebarOpen}
              hasChildren
              isExpanded={openMenus['institution']}
              onToggle={() => toggleMenu('institution')}
              childrenItems={[
                { label: 'Create Institution', to: 'institution/create' },
                { label: 'View Institutions', to: '/institutions' },
              ]}
            />
            <SidebarItem
              icon={<FaUser />}
              label="User Management"
              isSidebarOpen={isSidebarOpen}
              hasChildren
              isExpanded={openMenus['user']}
              onToggle={() => toggleMenu('user')}
              childrenItems={[
                { label: 'All Users', to: '/users' },
                { label: 'Add User', to: '/users/new' },
                { label: 'Roles', to: '/users/roles' },
              ]}
            />
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-2 border-t border-blue-700">
          <SidebarItem
            icon={<FaCog />}
            label="Settings"
            isSidebarOpen={isSidebarOpen}
            hasChildren
            isExpanded={openMenus['settings']}
            onToggle={() => toggleMenu('settings')}
            childrenItems={[
              { label: 'Profile Settings', to: '/settings/profile' },
              { label: 'System Preferences', to: '/settings/system' },
            ]}
          />

          {isSidebarOpen && (
            <div className="mt-4 text-xs text-gray-300 text-center">
              &copy; {new Date().getFullYear()} MyApp
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
          <div className="text-gray-800 font-semibold text-lg">
            Dashboard
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.first_name} {user?.last_name}
            </span>
            <button
              onClick={() => navigate('/profile')}
              className="text-sm text-blue-600 hover:underline"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
