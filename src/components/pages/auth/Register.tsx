import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { registerUser, selectAppState } from '../../../redux/userSlice';
import { toast } from 'react-toastify';

type RegisterDetails = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  institution_name?: string;
  class_code?: string;
};

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectAppState)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }, reset,setError
  } = useForm<RegisterDetails>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterDetails> = async (data): Promise<void> => {
    const finalData: RegisterDetails = {
      ...data,
      institution_name: 'None',
      class_code: 'grd-10',
    };

    const { payload } = await dispatch(registerUser(finalData))
    if (payload?.status === "success") {
      reset()
      navigate("/login", { replace: true })
    }
    if (payload?.status === "error" && payload.message) {
      Object.entries(payload.message).forEach(([field, messages]:[field:any,messages:any]) => {
        messages.forEach((msg:any) => {
          setError(field,{type:"server",message:msg})
          toast.error(`${field}: ${msg}`);
        });
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                {...register('first_name', { required: 'First name is required' })}
                className={`w-full px-4 py-2 ${errors.first_name ? 'border border-red-300' : 'border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.first_name && (
                <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                  <strong className="font-semibold">Error:</strong> first name is required.
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                {...register('last_name', { required: 'Last name is required' })}
                className={`w-full px-4 py-2 ${errors.last_name ? 'border border-red-300' : 'border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.last_name && (
                <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                  <strong className="font-semibold">Error:</strong> last name is required.
                </div>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className={`w-full px-4 py-2 ${errors.username ? 'border border-red-300' : 'border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.username && (
              <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                <strong className="font-semibold">Error:</strong> {errors.username.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-2 ${errors.email ? 'border border-red-300' : 'border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.email && (
              <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                <strong className="font-semibold">Error:</strong> {errors.email.message}.
              </div>
            )}
          </div>
          {/* Password with Show/Hide */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`w-full px-4 py-2 pr-10 ${errors.password ? 'border border-red-300' : 'border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  // Eye-off icon
                  <BsEyeSlash />
                ) : (
                  // Eye icon
                  <BsEye />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                <strong className="font-semibold">Error:</strong> {errors.password.message}.
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md transition duration-300"
          >
            {loading ? 'Please wait...' : 'Register'}
          </button>
        </form>

        <div className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
