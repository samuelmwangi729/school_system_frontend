import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { postData } from '../../../../utils/useAxios'

type TeachersType = {
    institution_name: string
    teacher_name: string
    subject_name: string
    class_code: string
}

const Teachers: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<TeachersType>()


    const onSubmit = async (data: TeachersType) => {
        const userUpdateData = {
            class_code: data.class_code,
            institution_name: data.institution_name,
            username: data.teacher_name
        }
        const updateResponse = await postData('/update', userUpdateData)
        if (updateResponse.status === "success") {
            toast.success(updateResponse.message)
            const response = await postData('/teachers', data)
            if (response.status === "success") {
                toast.success(response.message)
                reset()
            }
            if (response?.status === "error" && response.message) {
                Object.entries(response.message).forEach(([field, messages]: [field: any, messages: any]) => {
                    messages.forEach((msg: any) => {
                        setError(field, { type: "server", message: msg })
                        toast.error(`${msg}`);
                    });
                });
            }
        }
        if (updateResponse?.status === "success" && updateResponse.message) {
            Object.entries(updateResponse.message).forEach(([field, messages]: [field: any, messages: any]) => {
                messages.forEach((msg: any) => {
                    setError(field, { type: "server", message: msg })
                    toast.error(`${msg}`);
                });
            });
        }

    }

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Add Teacher</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                    <input
                        type="text"
                        {...register('institution_name', { required: 'Institution name is required' })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.institution_name && (
                        <p className="text-sm text-red-600">{errors.institution_name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teacher Name</label>
                    <input
                        type="text"
                        {...register('teacher_name', { required: 'Teacher name is required' })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.teacher_name && (
                        <p className="text-sm text-red-600">{errors.teacher_name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                    <input
                        type="text"
                        {...register('subject_name', { required: 'Subject name is required' })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.subject_name && (
                        <p className="text-sm text-red-600">{errors.subject_name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Class Code</label>
                    <input
                        type="text"
                        {...register('class_code', { required: 'Class code is required' })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.class_code && (
                        <p className="text-sm text-red-600">{errors.class_code.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded-md bg-primary hover:bg-red-700`}
                >
                    Submit
                </button>
            </form>
        </section>
    )
}

export default Teachers
