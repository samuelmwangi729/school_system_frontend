import React from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../../redux/hooks'
import { selectUserDetails } from '../../../../redux/userSlice'
import { postData } from '../../../../utils/useAxios'
import { toast } from 'react-toastify'

interface SubjectType {
    institution_name: string
    subject_code: number
    subject_name: string
    username: string
}

const CreateSubject: React.FC = () => {
    const user = useAppSelector(selectUserDetails)
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        setError
    } = useForm<SubjectType>()

    const onSubmit = async (data: SubjectType): Promise<void> => {
        const finalData = {
            ...data,
            username: user?.username
        }
        console.log('Submitted subject:', finalData)
        const response = await postData("/subjects", finalData)
        console.log(response)
        if (response.status === "success") {
            toast.success(response.message)
            reset()
        } else {
            if (response?.status === "error" && response.message) {
                Object.entries(response.message).forEach(([field, messages]: [field: any, messages: any]) => {
                    messages.forEach((msg: any) => {
                        setError(field, { type: "server", message: msg })
                        toast.error(`${field}: ${msg}`);
                    });
                });
            }
        }
    }

    return (
        <section className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Create a Subject</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 py-6 space-y-5"
            >
                <div className="flex flex-col">
                    <label htmlFor="institution_name" className="mb-1 text-sm font-medium">
                        Institution Name
                    </label>
                    <input
                        id="institution_name"
                        {...register('institution_name', { required: 'Institution name is required' })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Nairobi High School"
                    />
                    {errors.institution_name && (
                        <span className="text-sm text-red-600">{errors.institution_name.message}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="subject_code" className="mb-1 text-sm font-medium">
                        Subject Code
                    </label>
                    <input
                        id="subject_code"
                        type="number"
                        {...register('subject_code', {
                            required: 'Subject code is required',
                            min: { value: 1, message: 'Code must be a positive number' },
                        })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 101"
                    />
                    {errors.subject_code && (
                        <span className="text-sm text-red-600">{errors.subject_code.message}</span>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="subject_name" className="mb-1 text-sm font-medium">
                        Subject Name
                    </label>
                    <input
                        id="subject_name"
                        {...register('subject_name', { required: 'Subject name is required' })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Mathematics"
                    />
                    {errors.subject_name && (
                        <span className="text-sm text-red-600">{errors.subject_name.message}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Submit Subject
                </button>
            </form>
        </section>
    )
}

export default CreateSubject
