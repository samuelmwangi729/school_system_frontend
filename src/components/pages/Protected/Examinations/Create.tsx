import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserDetails } from '../../../../redux/userSlice';
import { postData } from '../../../../utils/useAxios';
import { toast } from 'react-toastify';

type ExaminationType = {
    institution_name: string;
    username: string;
    exam_name: string;
};

const Create: React.FC = () => {
    const user = useAppSelector(selectUserDetails)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }, setError
    } = useForm<ExaminationType>();

    const onSubmit: SubmitHandler<ExaminationType> = async (data): Promise<void> => {
        const finalData = {
            ...data,
            username: user?.username ?? null,
            exam_status: "active"
        }
        // Reset form after submit (optional)
        const response = await postData("/exams", finalData)
        if (response.status === "success") {
            toast.success(response.message)
            reset();
        } else {
            Object.entries(response.message).forEach(([field, messages]: [field: any, messages: any]) => {
                messages.forEach((msg: any) => {
                    setError(field, { type: "server", message: msg })
                    toast.error(`${field}: ${msg}`);
                });
            });
        }
    };

    return (
        <section className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Create Examination</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 space-y-5"
            >
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Institution Name
                    </label>
                    <input
                        type="text"
                        {...register('institution_name', { required: 'Institution name is required' })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Nairobi School"
                    />
                    {errors.institution_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.institution_name.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Exam Name</label>
                    <input
                        type="text"
                        {...register('exam_name', { required: 'Exam name is required' })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Midterm Test"
                    />
                    {errors.exam_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.exam_name.message}</p>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Create;
