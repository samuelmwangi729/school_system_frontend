import React from 'react'
import featureImg from '../../assets/images/features.png'
const Features: React.FC = () => {
    return (
        <section className='container'>
            <h2 className='text-center md:text-4xl py-3 capitalize font-bold text-primary'>
                application features
            </h2>
            <div className='bg-primary flex flex-row px-5'>
                <div className='hidden md:block md:w-1/2'>
                    <img src={featureImg} alt="application feature image" className='p-5 object-cover w-full' />
                </div>
                <div className='w-full md:w-1/2 mt-5 text-white'>
                    <span className='font-bold'>
                        Discover powerful features designed to streamline school management,
                        empower educators, and enhance the student experience.
                    </span>
                    <div className='mt-4 px-5 mb-5'>
                        <ol type="1" className="list-decimal list-inside space-y-1 text-gray-800 font-semibold">
                            <li className="text-secondary hover:underline transition-all duration-900">Student Information Management</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Attendance Tracking</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Class Scheduling</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Teacher Dashboard</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Parent Communication</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Fee Management</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Grade Reports</li>
                            <li className="text-secondary hover:underline transition-all duration-900">User Role Control</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Event & Notice Board</li>
                            <li className="text-secondary hover:underline transition-all duration-900">Simple User Interface</li>
                        </ol>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
