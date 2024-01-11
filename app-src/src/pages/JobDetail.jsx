import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { jobs } from '../utils/data'
import { FaHeartBroken } from "react-icons/fa";
import moment from 'moment'
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { CustomButton } from '../components'

const JobDetail = () => {
  
  const{id} = useParams();
  const[jobInfo, setJobInfo] = useState('');
  const[jdSelected, setjdSelected] = useState(true);

  // As the component Mounts, We will fetch the job details based on the id
  useEffect(()=>{
    setJobInfo(prevState => {
      window.scrollTo({top: '0', left:'0', behavior:'smooth'});
      let jobInfoFound = jobs.filter(item => item.id === id);
      if(jobInfoFound && jobInfoFound.length > 0) {
        return jobInfoFound[0];
      } else {
        return ''
      }
  })
  }, []);

  // console.log('###JOb_details: ', jobInfo);
  
  return (
    jobInfo ? (
    <div className='container mx-auto'>
      <div className="flex w-full flex-col md:flex-row gap-10">
        {/* Left side */}
        <div className='w-full md:w-2/3 2xl:w-2/4 h-fit bg-white shadow-lg py-10 px-5 md:px-10 rounded-md mt-2'>
          {/* Job Heading */}
          <div className="w-full flex items-center justify-between">
            <div className='w-3/4 flex gap-2'>
              <img 
                src={jobInfo?.company?.profileUrl} 
                alt={jobInfo?.company?.name}
                className='w-20 h-20 md:w-24 md:h-24 rounded' 
              />
              <div className='w-full flex flex-col'>
                <p className='text-lg xl:text-xl font-semibold text-slate-700'>
                  {jobInfo?.jobTitle}
                </p>
                <p className='text-base'>
                  {jobInfo?.location}
                </p>
                <p className='text-blue-500'>
                  {jobInfo?.company?.name}
                </p>
                <p className='text-gray-500 text-sm'>
                  {moment(jobInfo?.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <div className='w-1/4'>
              <AiOutlineSafetyCertificate className='text-3xl text-blue-500' />
            </div>
          </div>
          {/* Job Information */}
          <div className='w-full flex flex-wrap flex-col md:flex-row gap-8 md:gap-6 lg:gap-4 xl:gap-2 items-center justify-between my-10'>
            <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm '>salary</span>
              <span className='text-lg font-semibold text-slate-700'>{Intl.NumberFormat('en-us', {style:'currency', currency:'usd'}).format(jobInfo?.salary)}</span>
            </div>
            <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm '>Job Type</span>
              <span className='text-lg font-semibold text-slate-700'>{jobInfo?.jobType}</span>
            </div>
            <div className='bg-[#fed0ab] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm '>No. of Applicants</span>
              <span className='text-lg font-semibold text-slate-700'>{jobInfo?.applicants.length}K</span>
            </div>
            <div className='bg-[#cecdff] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm '>No. of Vacancies</span>
              <span className='text-lg font-semibold text-slate-700'>{jobInfo?.vacancies}</span>
            </div>
          </div>
          {/* Job Detail-Description */}
          <div className='w-full flex flex-col md:flex-row gap-2 items-center justify-between'>
            <CustomButton
              title={'Job Description'}
              customBtnStyle={`w-full flex items-center justify-center font-semibold py-1.5 rounded-2xl ${ jdSelected ? 'bg-black text-white border border-transparent' : 'bg-white text-black border border-black'}`}
              onClick={() => setjdSelected(prevState => !prevState)}
            />
            <CustomButton
              title={'Company'}
              customBtnStyle={`w-full flex items-center justify-center font-semibold py-1.5 rounded-2xl ${ jdSelected ? 'bg-white text-black border border-black': 'bg-black text-white border border-transparent'}`}
              onClick={() => setjdSelected(prevState => !prevState)}
            />
          </div>
          {
            jdSelected ? (
              // For showing job description
              <div className='py-8 w-full flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-semibold'>Job Description</p>
                  <span className='text-sm font-serif'>
                    {jobInfo?.detail[0]?.desc}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-semibold'>Job Requirement</p>
                  <span className='text-sm font-serif'>
                    {jobInfo?.detail[0]?.requirement}
                  </span>
                </div>
                <div className='w-full flex flex-col md:flex-row gap-2 items-center justify-between'>
                  <CustomButton
                    title={'Apply Now'}
                    customBtnStyle={`w-full flex items-center justify-center font-semibold py-1.5 rounded-2xl bg-black text-white border border-transparent hover:shadow-xl`}
                  />
                  
                </div>
              </div>
            ) : (
              // For showing company Information
              <div className='w-full flex flex-col gap-3 py-8'>
                <div className='flex flex-col'>
                  <p className='text-lg font-semibold'>
                    {jobInfo?.company?.name}
                  </p>
                  <p className='text-base'>
                    {jobInfo?.company?.location}
                  </p>
                  <p className='text-blue-500 text-base'>
                    {jobInfo?.company?.email}
                  </p>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-semibold'>About</p>
                  <span className='text-sm font-serif'>
                    {jobInfo?.company?.about}
                  </span>
                </div>
              </div>
            )
          }
        </div>
        {/* Right side */}
        <div>Right Side</div>
      </div>
    </div>
    ) : (
      <div className='container mx-auto px-5 flex flex-col items-center justify-center gap-2 bg-[#fdf7f7] rounded-md py-4'>
        <p className='text-base flex items-center tracking-wide'>
          <span className='font-semibold text-lg px-2'>Sorry !</span> We are not able to fetch the Job Information at the moment !
        </p>
        <p className='block'>
          Try Again After Somtime 
        </p>
        <FaHeartBroken className='w-20 h-20 text-red-500 bg-[#fdf7f7] border border-transparent rounded-md hover:shadow-lg hover:shadow-red-200 hover:scale-125 hover:delay-300 ease-in-out' />
      </div>
    )
  )
}

export default JobDetail