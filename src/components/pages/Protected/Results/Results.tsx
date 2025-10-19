import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserDetails } from '../../../../redux/userSlice';
import { postData } from '../../../../utils/useAxios';
import { toast } from 'react-toastify';

type GetResults = {
    exam_name: string;
    term: 'One' | 'Two' | 'Three';
    class_code: string;
};

type SubjectResult = {
    institution: string;
    form: string;
    subject: string;
    student: string;
    mark: number;
    grade: string;
};

type StudentData = {
    student: string;
    adm: string;
    results: SubjectResult[];
};

const SUBJECTS = [
    'English',
    'Mathematics',
    'Biology',
    'Chemistry',
    'Physics',
    'History',
    'Geography',
    'Kiswahili',
    'Business',
    'CRE',
];

// Helper function to assign grade by mark
const getGrade = (mark: number) => {
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B';
    if (mark >= 60) return 'C';
    if (mark >= 50) return 'D';
    return 'E';
};
const Results: React.FC = () => {
    const user = useAppSelector(selectUserDetails)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset, setError
    } = useForm<GetResults>();

    const [studentResults, setStudentResults] = useState<StudentData[]>([]);

    const onSubmit: SubmitHandler<GetResults> = async (data) => {
        const finalData = {
            ...data,
            institution_name: user.institution
        }
        const response = await postData("results/institution", finalData)
        if (response.status === "success") {
            const dataWithGrades = response.data.map((student: any) => ({
                ...student,
                results: student.results.map((r: any) => ({
                    ...r,
                    grade: getGrade(r.mark),
                })),
            }));
            setStudentResults(dataWithGrades);
            reset()
        }
        if (response?.status === "error" && response.message) {
            Object.entries(response.message).forEach(([field, messages]: [field: any, messages: any]) => {
                messages.forEach((msg: any) => {
                    setError(field, { type: "server", message: msg })
                    toast.error(`${field}: ${msg}`);
                });
            });
        }


    };
    const allSubjects = SUBJECTS;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
                    Get Class Results
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    <div>
                        <label className="block mb-1 font-medium text-gray-600">Exam Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Midterm"
                            {...register('exam_name', { required: 'Exam name is required' })}
                            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${errors.exam_name
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:ring-blue-400'
                                }`}
                        />
                        {errors.exam_name && (
                            <p className="text-sm text-red-500 mt-1">{errors.exam_name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-600">Term</label>
                        <select
                            {...register('term', { required: 'Term is required' })}
                            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${errors.term
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:ring-blue-400'
                                }`}
                        >
                            <option value="">Select Term</option>
                            <option value="One">One</option>
                            <option value="Two">Two</option>
                            <option value="Three">Three</option>
                        </select>
                        {errors.term && (
                            <p className="text-sm text-red-500 mt-1">{errors.term.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-600">Class Code</label>
                        <input
                            type="text"
                            placeholder="e.g. FORM1A"
                            {...register('class_code', { required: 'Class code is required' })}
                            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${errors.class_code
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:ring-blue-400'
                                }`}
                        />
                        {errors.class_code && (
                            <p className="text-sm text-red-500 mt-1">{errors.class_code.message}</p>
                        )}
                    </div>

                    <div className="sm:col-span-3 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Get Results
                        </button>
                    </div>
                </form>
            </div>
            {studentResults.length > 0 && (
                <div className="w-full max-w-6xl overflow-x-auto bg-white shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Results Summary</h3>
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Admission No</th>
                                {allSubjects.map((subject) => (
                                    <th
                                        key={subject}
                                        className="border border-gray-300 px-4 py-2 text-left"
                                    >
                                        {subject}
                                    </th>
                                ))}
                                <th className="border border-gray-300 px-4 py-2 text-left">Total Marks</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Average Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentResults.map((student, idx) => {
                                const total = student.results.reduce((sum, r) => sum + r.mark, 0);
                                const average = total / allSubjects.length;

                                return (
                                    <tr
                                        key={student.adm}
                                        className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{student.student}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.adm}</td>
                                        {allSubjects.map((subject) => {
                                            const subjectResult = student.results.find(
                                                (r) => r.subject === subject
                                            );
                                            return (
                                                <td
                                                    key={subject}
                                                    className="border border-gray-300 px-4 py-2 text-center"
                                                >
                                                    {subjectResult ? subjectResult.mark : '-'}
                                                </td>
                                            );
                                        })}
                                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                                            {total}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                                            {average.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Results;
