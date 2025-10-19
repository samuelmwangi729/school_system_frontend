import React, { useEffect, useState } from 'react';
import { getData } from '../../../../utils/useAxios';
import { FaUserGraduate } from 'react-icons/fa';
import type { statusTypes } from '../Examinations/Examinations';

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    user_class: string;
    account_status: statusTypes;
    institution: string;
}

const Students: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = async () => {
        try {
            const response = await getData<Student[] | any>('/students');
            setStudents(response.data);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);
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
    if (loading) return <p className="text-center py-8">Loading students...</p>;
    if (error) return <p className="text-center text-red-600 py-8">{error}</p>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FaUserGraduate className="text-blue-600" />
                Registered Students
            </h2>

            {students.length === 0 ? (
                <p className="text-gray-500">No students found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow-md">
                    <table className="min-w-full text-left border border-gray-200">
                        <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
                            <tr>
                                <th className="py-3 px-4 border-b">#</th>
                                <th className="py-3 px-4 border-b">First Name</th>
                                <th className="py-3 px-4 border-b">Last Name</th>
                                <th className="py-3 px-4 border-b">Username</th>
                                <th className="py-3 px-4 border-b">Class Code</th>
                                <th className="py-3 px-4 border-b">status</th>
                                <th className="py-3 px-4 border-b">Institution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, idx) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{idx + 1}</td>
                                    <td className="py-3 px-4 border-b">{student.first_name}</td>
                                    <td className="py-3 px-4 border-b">{student.last_name}</td>
                                    <td className="py-3 px-4 border-b">{student.username}</td>
                                    <td className="py-3 px-4 border-b">{student.user_class??"None"}</td>
                                    <td className="py-3 px-4 border-b">{statusBadge(student.account_status)}</td>
                                    <td className="py-3 px-4 border-b bg-blue-100 text-blue-800 font-bold">{student.institution}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default Students;
