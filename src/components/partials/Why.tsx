import React from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { HiOutlineCog } from 'react-icons/hi'
import { MdSchool } from 'react-icons/md'

const Why: React.FC = () => {
    return (
        <section className='container m-auto mt-5 mb-5'>
            <div>
                <h2 className='text-center font-bold text-4xl'>
                    Why <span className='text-primary'>Choose</span> Us
                </h2>
                <div className='w-3/4 m-auto sm:mt-5  md:w-full  grid grid-cols-1 md:grid-cols-3  gap-6 text-center mt-5'>
                    <div className='sm:h-[40vh] bg-white rounded-xl py-8 flex flex-col items-center justify-between'>
                        <div>
                            <HiOutlineCog size={60} className='text-secondary' />
                        </div>
                        <h2 className='text-primary font-bold my-2 text-4xl md:text-3xl'>
                            Simplify School Operations
                        </h2>
                        <span className='leading-relaxed font-md text-left px-5'>
                            Streamline daily tasks with efficient tools that boost productivity.
                        </span>
                    </div>
                    <div className='sm:h-[40vh] bg-white rounded-xl py-8 flex flex-col items-center justify-between'>
                        <div>
                            <FaChalkboardTeacher size={60} className='text-secondary' />
                        </div>
                        <h2 className='text-primary font-bold my-2 text-4xl md:text-3xl'>
                            Empower Every Teacher
                        </h2>
                        <span className='leading-relaxed font-md text-left px-5'>
                            Equip educators with smart features for better classroom impact.
                        </span>
                    </div>
                    <div className='sm:h-[40vh] bg-white rounded-xl py-8 flex flex-col items-center justify-between'>
                        <div>
                            <MdSchool size={60} className='text-secondary' />
                        </div>
                        <h2 className='text-primary font-bold my-2 text-4xl md:text-3xl'>
                            Engage Students Better
                        </h2>
                        <span className='leading-relaxed font-md text-left px-5'>
                            Foster learning through interactive modules and modern tools.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Why
