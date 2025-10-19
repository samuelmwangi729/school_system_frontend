import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserDetails } from '../../../../redux/userSlice';
import { postData } from '../../../../utils/useAxios';
import { toast } from 'react-toastify';

type ResultType = {
    institution_name: string;
    term: 'One' | 'Two' | 'Three';
    student_admno: number;
    exam_name: string;
    teacher_name: string;
    subject_code: number;
    class_code: string;
    mark: number;
};

const AddResults: React.FC = () => {
    const user = useAppSelector(selectUserDetails);

    const {
        register,
        handleSubmit,
        formState: { errors }, reset, setError
    } = useForm<ResultType>();

    const onSubmit: SubmitHandler<ResultType> = async (data) => {
        const finalData = {
            ...data,
            teacher_name: user.username,
            institution_name: user.institution
        };
        const response = await postData("/results", finalData)
        if (response.status === "success") {
            toast.success(response.message)
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

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Result</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Term</label>
                    <select
                        {...register('term', { required: 'Term is required' })}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select Term</option>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                    </select>
                    {errors.term && (
                        <p className="text-red-500 text-sm">{errors.term.message}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Student Admission No</label>
                    <input
                        type="number"
                        {...register('student_admno', { required: 'Admission number is required' })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.student_admno && (
                        <p className="text-red-500 text-sm">{errors.student_admno.message}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Exam Name</label>
                    <input
                        type="text"
                        {...register('exam_name', { required: 'Exam name is required' })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.exam_name && (
                        <p className="text-red-500 text-sm">{errors.exam_name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Subject Code</label>
                    <input
                        type="number"
                        {...register('subject_code', {
                            required: 'Subject code is required',
                        })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.subject_code && (
                        <p className="text-red-500 text-sm">{errors.subject_code.message}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Class Code</label>
                    <input
                        type="text"
                        {...register('class_code', { required: 'Class code is required' })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.class_code && (
                        <p className="text-red-500 text-sm">{errors.class_code.message}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Mark</label>
                    <input
                        type="number"
                        {...register('mark', {
                            required: 'Mark is required',
                            min: { value: 0, message: 'Mark cannot be less than 0' },
                            max: { value: 100, message: 'Mark cannot exceed 100' },
                            valueAsNumber: true
                        })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.mark && (
                        <p className="text-red-500 text-sm">{errors.mark.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddResults;
