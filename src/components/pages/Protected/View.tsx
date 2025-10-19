import React from 'react'
import { BsBookmark } from 'react-icons/bs'
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaClipboardList,
  FaBuilding,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const View: React.FC = () => {
  const navigate = useNavigate()

  const stats = [
    {
      title: 'Students',
      icon: <FaUserGraduate className="text-4xl text-blue-600" />,
      bg: 'bg-blue-100',
      path: '/students',
    },
    {
      title: 'Teachers',
      icon: <FaChalkboardTeacher className="text-4xl text-green-600" />,
      bg: 'bg-green-100',
      path: '/teachers',
    },
    {
      title: 'Classes',
      icon: <FaSchool className="text-4xl text-purple-600" />,
      bg: 'bg-purple-100',
      path: '/classes',
    },
    {
      title: 'Subjects',
      icon: <FaBook className="text-4xl text-yellow-600" />,
      bg: 'bg-yellow-100',
      path: '/subjects',
    },
    {
      title: 'Institutions',
      icon: <FaBuilding className="text-4xl text-red-600" />,
      bg: 'bg-red-100',
      path: '/institutions',
    },
    {
      title: 'Examinations',
      icon: <FaClipboardList className="text-4xl text-indigo-600" />,
      bg: 'bg-indigo-100',
      path: '/examinations',
    },
    {
      title: 'Results',
      icon: <BsBookmark className="text-4xl text-cyan-600" />,
      bg: 'bg-cyan-100',
      path: '/results',
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default View
