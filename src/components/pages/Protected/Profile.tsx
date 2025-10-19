import React from 'react'
import {
  FaUser,
  FaEnvelope,
  FaSchool,
  FaUserShield,
} from 'react-icons/fa'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserDetails } from '../../../redux/userSlice'

const Profile: React.FC = () => {
  const user = useAppSelector(selectUserDetails)

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Profile
        </h2>

        <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-xl p-8 md:flex md:items-center md:space-x-10 transition-transform hover:scale-[1.01]">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-200 to-purple-200 shadow-inner flex items-center justify-center text-6xl text-indigo-700">
              <FaUser />
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <InfoItem icon={<FaUser className="text-blue-600" />} label="Name" value={user?.first_name ?? 'N/A'} />
            <InfoItem icon={<FaEnvelope className="text-green-600" />} label="Username / Email" value={user?.username ?? 'N/A'} />
            <InfoItem icon={<FaUserShield className="text-purple-600" />} label="Role" value={user?.role ?? 'N/A'} />
            <InfoItem icon={<FaSchool className="text-yellow-500" />} label="Institution" value={user?.institution ?? 'N/A'} />
          </div>
        </div>
      </div>
    </section>
  )
}

type InfoItemProps = {
  icon: React.ReactNode
  label: string
  value: string
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
)

export default Profile
