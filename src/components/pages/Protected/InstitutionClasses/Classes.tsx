import React, { useEffect, useState } from 'react'
import { getData } from '../../../../utils/useAxios' // Adjust path if needed
import type { statusTypes } from '../Examinations/Examinations'
import { toast } from 'react-toastify'

interface ClassType {
    class_name: string
    class_code: string
    institution: string
    class_status: statusTypes
}

const Classes: React.FC = () => {
    const [classes, setClasses] = useState<ClassType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const { data }: any = await getData<ClassType[]>('/classes')
                console.log(data)
                setClasses(data)
            } catch (err: any) {
                setError('Failed to load classes')
            } finally {
                setLoading(false)
            }
        }

        fetchClasses()
    }, [])
    const statusBadge = (status: statusTypes) => {
        const base = 'text-xs font-semibold px-2 py-1 rounded-full';
        switch (status) {
            case 'active':
                return <span className={`${base} bg-green-100 text-green-700`}>Active</span>;
            case 'suspended':
                return <span className={`${base} bg-yellow-100 text-yellow-700`}>Suspended</span>;
            case 'deleted':
                return <span className={`${base} bg-red-100 text-red-700`}>Deleted</span>;
            default:
                return null;
        }
    };
    const updateStatus = async(cls:ClassType,action:statusTypes):Promise<void>=>{
        //update  the classes  here
        console.log(cls)
        console.log(action)
        toast.success('actions in updates')
    }
    return (
        <section className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 flex justify-center items-center gap-2">
                Classes
            </h2>

            {loading && (
                <p className="text-center text-blue-500 animate-pulse">Loading classes...</p>
            )}

            {error && (
                <p className="text-center text-red-500 font-medium">{error}</p>
            )}

            {!loading && !error && classes.length === 0 && (
                <p className="text-center text-gray-500">No classes found.</p>
            )}

            {!loading && classes.length > 0 && (
                <div className="overflow-x-auto shadow border rounded-lg">
                    <table className="min-w-full text-sm text-left bg-white">
                        <thead className="bg-gray-100 uppercase text-gray-600">
                            <tr>
                                <th className="px-4 py-3">Class Name</th>
                                <th className="px-4 py-3">Class Code</th>
                                <th className="px-4 py-3">Institution</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {classes.map((cls, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-blue-50 transition-all duration-200"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-900">{cls.class_name}</td>
                                    <td className="px-4 py-3 text-gray-700">{cls.class_code}</td>
                                    <td className="px-4 py-3 text-gray-700">{cls.institution}</td>
                                    <td className="px-4 py-3 text-gray-700">{statusBadge(cls.class_status)}</td>
                                    <td className="px-4 py-3 text-gray-700">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => updateStatus(cls, 'active')}
                                                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Activate
                                            </button>
                                            <button
                                                onClick={() => updateStatus(cls, 'suspended')}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Suspend
                                            </button>
                                            <button
                                                onClick={() => updateStatus(cls, 'deleted')}
                                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}

export default Classes
