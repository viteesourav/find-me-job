import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineLocationCity } from 'react-icons/md'

const CompanyCard = ({company}) => {
  return (
    <Link to={`/company-profile/${company._id}`}>
        <div className='w-[16rem] md:w-[18rem] flex flex-col gap-3 px-3 py-2 rounded-md shadow-md hover:shadow-xl'>
            {/* Card Header */}
            <div className='w-full flex gap-3 justify-start items-center'>
                <img 
                    src={company.profileUrl} 
                    alt={company.name}
                    className='w-16 h-16 md:w-18 md:h-18 rounded-md' 
                />
                <div className='w-full flex flex-col justify-start'>
                    <span className='text-sm md:text-base font-semibold text-gray-500'>{company.name}</span>
                    <span className='text-xs md:text-sm text-blue-500'>{company.email}</span>
                    <div className='flex flex-row items-center gap-1'>
                        <MdOutlineLocationCity className='text-gray-700'/>
                        <span className='text-xs md:text-sm text-gray-700'>{company.location}</span>
                    </div>
                </div>
            </div>
            {/* Card Container */}
            <div className='flex flex-col items-center justify-center gap-2'>
                <span className='text-xl md:text-2xl text-blue-700 font-semibold'>{parseInt(company.jobPosts.length)}</span>
                <span className='text-base md:text-xl text-gray-400'>Job Posted</span>
            </div>
        </div>
    </Link>
  )
}

export default CompanyCard