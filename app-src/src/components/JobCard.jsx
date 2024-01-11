import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapLocationDot } from "react-icons/fa6";
import moment from 'moment'

const JobCard = ({jobInfo}) => {
  return (
    <Link to={`/job-detail/${jobInfo.id}`}>
        <div className='w-full md:w-[15rem] 2xl:w-[18rem] rounded-md px-3 py-5 flex flex-col justify-between shadow-lg bg-white'>
            <div className='flex gap-3'>
                <img 
                    src={jobInfo?.company?.profileUrl} 
                    alt="company_img" 
                    className='w-14 h-14 rounded-md object-contain'
                />
                <div className='flex flex-col justify-center'>
                    <p className='font-semibold text-sm'>
                        {jobInfo?.jobTitle}
                    </p>
                    <div className='flex flex-row gap-2 items-center'>
                        <FaMapLocationDot className='text-sm text-slate-700' />
                        <span className='text-sm'>{jobInfo?.location}</span>
                    </div>
                </div>
            </div>

            <div className='py-3'>
                <p className='text-sm'>
                {jobInfo?.detail[0]?.desc.slice(0, 150) + "..."}
                </p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='bg-blue-200 text-blue-700 font-semibold px-2 py-0.5 rounded-md text-xs md:text-sm'>
                    {jobInfo?.jobType}
                </p>
                <span className='text-sm'>
                    {moment(jobInfo?.createdAt).fromNow()}
                </span>
            </div>
        </div>
    </Link>
  )
}

export default JobCard