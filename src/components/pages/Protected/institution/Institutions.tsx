import React, { useEffect, useState } from 'react'
import { getData, putData } from '../../../../utils/useAxios'
import { useAppSelector } from '../../../../redux/hooks'
import { selectUserDetails } from '../../../../redux/userSlice'
import { toast } from 'react-toastify'

type InstitutionType = {
  name: string
  subcounty: string
  county: string
  status: string
  category: 'national' | 'extra_county' | 'county'
  institutionType: 'day' | 'boarding'
  studentGender: 'boys' | 'girls' | 'mixed'
}

const Institutions: React.FC = () => {
  const user = useAppSelector(selectUserDetails)
  const [institutions, setInstitutions] = useState<InstitutionType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInstitutions = async () => {
    setLoading(true)
    setError(null)

    try {
      const response: any = await getData('/institutions')
      const data = Array.isArray(response) ? response : response.data

      if (!Array.isArray(data)) throw new Error('Invalid data format')

      setInstitutions(data)
    } catch (err: any) {
      console.error('Fetch error:', err)
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch institutions'
      )
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {

    fetchInstitutions()
  }, [])

  const workOnInstitution = async (
    institution: InstitutionType,
    action: 'active' | 'suspended' | 'deleted'
  ) => {
    const url = `/institution/${institution.name}`
    const data = { status: action }

    const response = await putData(url, data)
    if (response.status === 'success') {
      toast.success(response.message)
      fetchInstitutions()
    } else {
      toast.error(response.message)
    }
  }

  const statusBadge = (status: string) => {
    const colorMap: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      deleted: 'bg-red-100 text-red-800',
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {status}
      </span>
    )
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Institutions</h2>

      {loading && (
        <p className="text-center text-blue-500 animate-pulse">Loading institutions...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      {!loading && !error && institutions.length === 0 && (
        <p className="text-center text-gray-500">No institutions found.</p>
      )}

      {!loading && institutions.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-sm text-gray-700 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Subcounty</th>
                <th className="px-4 py-3 text-left">County</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Gender</th>
                {user.role === 'super_admin' && (
                  <th className="px-4 py-3 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
              {institutions.map((inst, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-4 py-3 font-medium">{inst.name}</td>
                  <td className="px-4 py-3">{inst.subcounty}</td>
                  <td className="px-4 py-3">{inst.county}</td>
                  <td className="px-4 py-3">{statusBadge(inst.status)}</td>
                  <td className="px-4 py-3 capitalize">{inst.category.replace('_', ' ')}</td>
                  <td className="px-4 py-3 capitalize">{inst.institutionType}</td>
                  <td className="px-4 py-3 capitalize">{inst.studentGender}</td>
                  {user.role === 'super_admin' && (
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded transition"
                          title="Edit institution"
                        >
                          Edit
                        </button>
                        {inst.status === "active" ? (
                          <button
                            onClick={() => workOnInstitution(inst, 'suspended')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-xs rounded transition"
                            title="Suspend institution"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => workOnInstitution(inst, 'active')}
                            className="bg-primary hover:bg-yellow-600 text-white px-3 py-1 text-xs rounded transition"
                            title="Activate institution"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => workOnInstitution(inst, 'deleted')}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded transition"
                          title="Delete institution"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Institutions
