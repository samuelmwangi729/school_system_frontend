import React, { useState } from 'react'
import {
  FaBars,
  FaHome,
  FaUser,
  FaCog,
  FaChalkboardTeacher,
  FaUserGraduate,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import SidebarItem from './SidebarItem'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logoutUser, selectUserDetails } from '../../redux/userSlice'
import persistStore from 'redux-persist/es/persistStore'
import store from '../../redux/store'
import {
  BsBank,
  BsBookmark,
  BsBuilding,
  BsClipboard2Check,
  BsList,
} from 'react-icons/bs'

const menuItems = [
  {
    label: 'Home',
    icon: <FaHome />,
    to: '/dashboard',
  },
  {
    label: 'Institutions',
    icon: <BsBuilding />,
    children: [
      { label: 'Create Institution', to: 'institution/create' },
      { label: 'View Institutions', to: '/institutions' },
    ],
  },
  {
    label: 'Examinations',
    icon: <BsClipboard2Check />,
    children: [
      { label: 'Create Examinations', to: 'exam/create' },
      { label: 'View Examinations', to: '/examinations' },
    ],
  },
  {
    label: 'Subjects',
    icon: <BsList />,
    children: [
      { label: 'Add Subjects', to: 'subject/create' },
      { label: 'View Subjects', to: '/subjects' },
    ],
  },
  {
    label: 'Classes',
    icon: <BsBank />,
    children: [
      { label: 'Add Classes', to: 'classes/create' },
      { label: 'View Classes', to: '/classes' },
    ],
  },
  {
    label: 'Teachers',
    icon: <FaChalkboardTeacher />,
    children: [
      { label: 'Add Teachers', to: 'teachers/add' },
      { label: 'View Teachers', to: '/teachers' },
    ],
  },
  {
    label: 'Students',
    icon: <FaUserGraduate />,
    children: [
      { label: 'Add Student', to: 'student/add' },
      { label: 'Bulk Students', to: 'students/add/bulk' },
      { label: 'View Students', to: '/students' },
    ],
  },
  {
    label: 'Results',
    icon: <BsBookmark />,
    children: [
      { label: 'Add Results', to: 'results/add' },
      { label: 'View Results', to: '/results' },
    ],
  },
  {
    label: 'Settings',
    icon: <FaCog />,
    children: [
      { label: 'Profile Settings', to: '/profile' },
    ],
  },
]

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const user = useAppSelector(selectUserDetails)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const handleLogout = () => {
    persistStore(store).purge()
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 260 : 70 }}
        className="bg-primary text-white shadow-lg flex flex-col transition-all duration-300"
      >
        {/* Top */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-800">
          {isSidebarOpen && (
            <h2 className="text-lg font-semibold truncate">
              {user?.first_name} {user?.last_name}
            </h2>
          )}
          <button onClick={toggleSidebar}>
            <FaBars className="text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-auto px-2 py-4 space-y-2">
          {menuItems.map((item, idx) => (
            <SidebarItem
              key={idx}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isSidebarOpen={isSidebarOpen}
              hasChildren={!!item.children}
              isExpanded={openMenus[item.label]}
              onToggle={() => toggleMenu(item.label)}
              childrenItems={item.children}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-blue-800">
          {isSidebarOpen && (
            <div className="text-sm text-gray-300 text-center mb-3">
              &copy; {new Date().getFullYear()} ScholarVio
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-2 text-sm hover:bg-blue-800 px-3 py-2 rounded transition"
          >
            <FaUser />
            {isSidebarOpen && 'Logout'}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm">
              {user?.first_name} {user?.last_name}
            </span>
            <button
              onClick={() => navigate('/profile')}
              className="text-blue-600 hover:underline text-sm"
            >
              View Profile
            </button>
          </div>
        </header>

        {/* Main Outlet */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Sidebar