import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Update: React.FC = () => {
  const {token} = useParams()
  const validateToken = async(token:string):Promise<boolean>=>{
    console.log(token)
    return true
  }
  useEffect(()=>{
    if(token){
      validateToken(token)
    }
  },[token])
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Password</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300">
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default Update;
