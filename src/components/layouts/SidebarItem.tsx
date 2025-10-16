import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  to?: string
  isSidebarOpen: boolean
  hasChildren?: boolean
  isExpanded?: boolean
  onToggle?: () => void
  childrenItems?: { label: string; to: string }[]
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  to = '/',
  isSidebarOpen,
  hasChildren = false,
  isExpanded = false,
  onToggle,
  childrenItems = [],
}) => {
  const parentClass =
    'flex items-center justify-between p-2 rounded-md hover:bg-gray-200 transition-colors'

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 ${
      isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
    }`

  return (
    <div className="mb-1">
      {hasChildren ? (
        <div
          className={`${parentClass} cursor-pointer`}
          onClick={onToggle}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{icon}</span>
            {isSidebarOpen && <span className="text-sm font-medium">{label}</span>}
          </div>
          {isSidebarOpen && (
            <span>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
          )}
        </div>
      ) : (
        <NavLink to={to} className={`${parentClass}`}>
          <div className="flex items-center space-x-3">
            <span className="text-lg">{icon}</span>
            {isSidebarOpen && <span className="text-sm font-medium">{label}</span>}
          </div>
        </NavLink>
      )}

      {/* Animated children */}
      <AnimatePresence initial={false}>
        {isExpanded && isSidebarOpen && (
          <motion.div
            key="submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-10 mt-1 overflow-hidden"
          >
            {childrenItems.map((child, index) => (
              <NavLink
                key={index}
                to={child.to}
                className={({ isActive }) =>
                  `block py-1 text-sm ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
                  } hover:underline`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SidebarItem
