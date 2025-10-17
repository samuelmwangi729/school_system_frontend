import React from 'react'
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaUserTie,
  FaCalendarAlt,
  FaClipboardList,
  FaUserFriends,
  FaBuilding,
  FaEnvelope,
  FaMoneyBillWave,
  FaLaptopCode
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const View: React.FC = () => {
  const navigate = useNavigate()

  const stats = [
    {
      title: 'Students',
      value: 1280,
      icon: <FaUserGraduate className="text-4xl text-blue-600" />,
      bg: 'bg-blue-100',
      path: '/students',
    },
    {
      title: 'Teachers',
      value: 85,
      icon: <FaChalkboardTeacher className="text-4xl text-green-600" />,
      bg: 'bg-green-100',
      path: '/teachers',
    },
    {
      title: 'Classes',
      value: 40,
      icon: <FaSchool className="text-4xl text-purple-600" />,
      bg: 'bg-purple-100',
      path: '/classes',
    },
    {
      title: 'Subjects',
      value: 25,
      icon: <FaBook className="text-4xl text-yellow-600" />,
      bg: 'bg-yellow-100',
      path: '/subjects',
    },
    {
      title: 'Admins',
      value: 5,
      icon: <FaUserTie className="text-4xl text-red-600" />,
      bg: 'bg-red-100',
      path: '/admins',
    },
    {
      title: 'Examinations',
      value: 18,
      icon: <FaClipboardList className="text-4xl text-indigo-600" />,
      bg: 'bg-indigo-100',
      path: '/examinations',
    },
    {
      title: 'Parents',
      value: 540,
      icon: <FaUserFriends className="text-4xl text-pink-600" />,
      bg: 'bg-pink-100',
      path: '/parents',
    },
    {
      title: 'Attendance',
      value: 95,
      icon: <FaCalendarAlt className="text-4xl text-teal-600" />,
      bg: 'bg-teal-100',
      path: '/attendance',
    },
    {
      title: 'Departments',
      value: 8,
      icon: <FaBuilding className="text-4xl text-orange-600" />,
      bg: 'bg-orange-100',
      path: '/departments',
    },
    {
      title: 'Messages',
      value: 120,
      icon: <FaEnvelope className="text-4xl text-gray-700" />,
      bg: 'bg-gray-100',
      path: '/messages',
    },
    {
      title: 'Fees & Billing',
      value: 300,
      icon: <FaMoneyBillWave className="text-4xl text-emerald-600" />,
      bg: 'bg-emerald-100',
      path: '/billing',
    },
    {
      title: 'E-learning',
      value: 15,
      icon: <FaLaptopCode className="text-4xl text-cyan-600" />,
      bg: 'bg-cyan-100',
      path: '/elearning',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.path)}
            className={`cursor-pointer rounded-lg shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${stat.bg}`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-white shadow">{stat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default View
