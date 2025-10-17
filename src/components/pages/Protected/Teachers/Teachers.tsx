import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getData } from '../../../../utils/useAxios'
import type { statusTypes } from '../Examinations/Examinations'

type TeachersType = {
    status: statusTypes
    teacher: string
    subject: string
    form: string
}

const Teachers: React.FC = () => {
    const [teachers, setTeachers] = useState<TeachersType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await getData<{ data: TeachersType[] }>('/teachers')
                setTeachers(response.data)
            } catch (error: any) {
                toast.error('Failed to fetch teachers')
            } finally {
                setLoading(false)
            }
        }

        fetchTeachers()
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
    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">All Teachers</h2>

            {loading ? (
                <p className="text-center text-blue-500 animate-pulse">Loading teachers...</p>
            ) : teachers.length === 0 ? (
                <p className="text-center text-gray-500">No teachers found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Subject</th>
                                <th className="px-4 py-3 text-left">Class Code</th>
                                <th className="px-4 py-3 text-left">Institution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(teachers) &&
                                teachers.map((teacher, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                                    >
                                        <td className="px-4 py-3">{teacher.teacher}</td>
                                        <td className="px-4 py-3">{teacher.subject}</td>
                                        <td className="px-4 py-3">{teacher.form}</td>
                                        <td className="px-4 py-3">{statusBadge(teacher.status)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}

export default Teachers
