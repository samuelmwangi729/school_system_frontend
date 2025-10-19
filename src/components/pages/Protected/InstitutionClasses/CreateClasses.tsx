import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { postData } from '../../../../utils/useAxios'
import { useAppSelector } from '../../../../redux/hooks'
import { selectUserDetails } from '../../../../redux/userSlice'

interface StudentClass {
    class_name: string
    class_code: string
    institution_name: string
    username: string
}

const CreateClasses: React.FC = () => {
    const user = useAppSelector(selectUserDetails)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<StudentClass>()

    const onSubmit: SubmitHandler<StudentClass> = async (data) => {
        const finalData = {
            ...data,
            username: user?.username
        }
        const response = await postData('/classes', finalData)
        if (response.status === 'success') {
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

    return (
        <section className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Create Class</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
            >
                <div>
                    <label htmlFor="institution_name" className="block text-sm font-medium text-gray-700">
                        Institution Name
                    </label>
                    <input
                        id="institution_name"
                        type="text"
                        {...register('institution_name', { required: 'Institution name is required' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.institution_name && <p className="text-red-600 text-sm mt-1">{errors.institution_name.message}</p>}
                </div>
                <div>
                    <label htmlFor="class_name" className="block text-sm font-medium text-gray-700">
                        Class Name
                    </label>
                    <input
                        id="class_name"
                        type="text"
                        {...register('class_name', { required: 'Class name is required' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.class_name && <p className="text-red-600 text-sm mt-1">{errors.class_name.message}</p>}
                </div>

                <div>
                    <label htmlFor="class_code" className="block text-sm font-medium text-gray-700">
                        Class Code
                    </label>
                    <input
                        id="class_code"
                        type="text"
                        {...register('class_code', { required: 'Class code is required' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.class_code && <p className="text-red-600 text-sm mt-1">{errors.class_code.message}</p>}
                </div>



                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create Class
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreateClasses
