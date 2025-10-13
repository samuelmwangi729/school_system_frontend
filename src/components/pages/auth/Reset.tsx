import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type ResetPasswordForm = {
  email: string;
};

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    console.log('Reset link requested for:', data.email);
    // You can send this to your backend via fetch/axios
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className={`w-full px-4 py-2 ${errors.email?'border border-red-400':'border'} rounded-md outline-none`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
