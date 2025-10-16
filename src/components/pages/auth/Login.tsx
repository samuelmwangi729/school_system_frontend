import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { loginUser, selectAppState } from '../../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface InputDataInterface {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectAppState)
  const [showPassword, setShowPassword] = useState<boolean>(() => false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InputDataInterface>()
  const login: SubmitHandler<any> = async (data: InputDataInterface): Promise<any> => {
    await dispatch(loginUser(data))
    reset()
  }
  const changeInputType = () => {
    setShowPassword(!showPassword)
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login </h2>

        <form className="space-y-4" onSubmit={handleSubmit(login)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className={`w-full px-4 py-2 ${errors.email ? 'border border-red-400' : 'border'} rounded-md outline-none`}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                <strong className="font-semibold">Error:</strong> email is required.
              </div>
            )}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className={`flex  items-center gap-2 ${errors.password ? 'border border-red-400' : 'border'} rounded-md`}>
              <div className='w-[90%]'>
                <input type={`${showPassword ? 'text' : 'password'}`}
                  className={`w-full px-4 py-2  outline-none`}
                  {...register('password', { required: true })}
                />
              </div>
              <div onClick={changeInputType} className='transition-all duration-300'>
                {showPassword ? <BsEyeSlash title='hide password' size={25} /> : <BsEye title='show password' size={25} />}


              </div>
            </div>
            {errors.password && (
              <div className="mt-2 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                <strong className="font-semibold">Error:</strong> Password is required.
              </div>
            )}
          </div>

          <button type="submit" className={`w-full  text-white py-2 rounded-md hover:bg-primary-dark transition duration-300 ${loading ? 'bg-gray-500' : 'bg-primary'}`} disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-center mt-4 text-gray-600">
          <Link to="/reset" className="text-primary hover:underline">Forgot password?</Link>
        </div>

        <div className="text-sm text-center mt-2 text-gray-600">
          Don’t have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
