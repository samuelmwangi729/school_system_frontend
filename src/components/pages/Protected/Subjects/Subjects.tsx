import React, { useEffect, useState } from 'react'
import { getData, putData } from '../../../../utils/useAxios' 
import { toast } from 'react-toastify'
import type { statusTypes } from '../Examinations/Examinations';

type SubjectType = {
    institution: string;
    subject_code: number;
    subject_name: string;
    created_by: string;
    status: statusTypes;
}

const Subjects: React.FC = () => {
    const [subjects, setSubjects] = useState<SubjectType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSubjects = async () => {
        setLoading(true)
        setError(null)

        try {
            const response: any = await getData('/subjects') 
            const data = Array.isArray(response) ? response : response.data

            if (!Array.isArray(data)) {
                throw new Error('Invalid data format: expected array')
            }

            setSubjects(data)
        } catch (err: any) {
            console.error('Fetch error:', err)
            setError('Failed to fetch subjects')
            toast.error('Failed to load subjects')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchSubjects()
    }, [])
    const updateSubjects = async (subject: SubjectType, action: statusTypes): Promise<void> => {
        const url = `/subject/${subject.subject_code}`
        const finalData = {
            institution_name: subject.institution,
            subject: subject.subject_name,
            status: action
        }
        const response = await putData(url, finalData)
        toast.success(response.message)
        fetchSubjects()
    }
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
            <h2 className="text-2xl font-bold mb-6 text-center">All Subjects</h2>

            {loading && (
                <p className="text-center text-blue-500 animate-pulse">Loading subjects...</p>
            )}

            {error && (
                <p className="text-center text-red-600 font-semibold">{error}</p>
            )}

            {!loading && !error && subjects.length === 0 && (
                <p className="text-center text-gray-500">No subjects found.</p>
            )}

            {!loading && subjects.length > 0 && (
                <div className="overflow-x-auto rounded shadow">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Subject Code</th>
                                <th className="px-4 py-3 text-left">Subject Name</th>
                                <th className="px-4 py-3 text-left">Institution</th>
                                <th className="px-4 py-3 text-left">Created By</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{subject.subject_code}</td>
                                    <td className="px-4 py-3">{subject.subject_name}</td>
                                    <td className="px-4 py-3">{subject.institution}</td>
                                    <td className="px-4 py-3">{subject.created_by}</td>
                                    <td className="px-4 py-3">{statusBadge(subject.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            {subject.status === "active" ? (
                                                <button
                                                    onClick={() => updateSubjects(subject, "suspended")}
                                                    className="bg-yellow-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                                                >
                                                    Suspend
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => updateSubjects(subject, "active")}
                                                    className="bg-primary hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                                                >
                                                    Activate
                                                </button>
                                            )}

                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
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

export default Subjects
