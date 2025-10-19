import React from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../../../../utils/useAxios';
import { toast } from 'react-toastify';

type RegisterDetails = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    institution_name: string;
    class_code: string;
    role: string
};

const Student: React.FC = () => {
    const app_domain = import.meta.env.VITE_DOMAIN
    console.log(app_domain)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError
    } = useForm<RegisterDetails>();

    const onSubmit = async (data: RegisterDetails) => {
        const finalData = {
            ...data,
            role: "student",
            email: `${data.username}@${app_domain}`,
            password: 'SecurePass1'
        }
        const response = await postData('/register', finalData)
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
    };

    return (
        <section className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-6">Register New Student</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className='flex justify-between items-center gap-5 w-full'>
                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            {...register('first_name', { required: 'First name is required' })}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.first_name && (
                            <p className="text-red-600 text-sm">{errors.first_name.message}</p>
                        )}
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            {...register('last_name', { required: 'Last name is required' })}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.last_name && (
                            <p className="text-red-600 text-sm">{errors.last_name.message}</p>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.username && (
                        <p className="text-red-600 text-sm">{errors.username.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input
                        {...register('institution_name', { required: 'Institution is required' })}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.institution_name && (
                        <p className="text-red-600 text-sm">{errors.institution_name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Class Code</label>
                    <input
                        {...register('class_code', { required: 'Class code is required' })}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.class_code && (
                        <p className="text-red-600 text-sm">{errors.class_code.message}</p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Register Student
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Student;
