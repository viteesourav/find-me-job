import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomButton, JobCard, JobType, ListBox, Loading, TextInput } from '../components'
import { dbConnection } from '../utils';
import { useSelector } from 'react-redux';

// Upload Job Form to post new Jobs [*** uses react-hook-form ***]
const UploadJob = () => {
  const {user} = useSelector(state => state.user);
  const[jobType, setJobType] = useState('Full-Time');
  const[recentJobPosts, setRecentJobPosts] = useState([]);
  const[errMsg, setErrMsg] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  const[isFetchingRecentJobs, setIsFetchingRecentJobs] = useState(false);
  
  // Handle Job Post Form...
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState:{errors}
  } = useForm({
    mode:'onChange'
  })

  //Handle On submit of Job Post...
  const onSubmit = async (frmObj) => {
    setIsLoading(true);

    let updatedJobPaylaod = {
      ...frmObj, 
      jobType,
      desc: frmObj.description,
      requirements: frmObj.responsibility 
    };
    
    try {
      const resp = await dbConnection({
        url: '/job/jobPosts',
        method: 'POST',
        data: updatedJobPaylaod,
        token: user?.token
      });
      setIsLoading(false);
      if(resp.status === 201) {
        console.log('###Job Successfully Added');
        fetchLoggedInCompayInfo();
        reset();
      }
    } catch(err) {
      console.log(err);
    } finally{
      console.log('###Form Submited Data: ', updatedJobPaylaod);
    }
  }

  //Fetch Current Company Info, with Jobs...
  const fetchLoggedInCompayInfo = async () => {
    let id = user && user?._id;

    setIsFetchingRecentJobs(true);

    let resp = await dbConnection({
      url: 'company/companyProfile/' + id,
      method: 'GET',
      token: user?.token
    });
    setIsFetchingRecentJobs(false);
    if(resp.status == 200) {
      console.log('###UpdatedJobProfileInfo: ', resp?.data);
      setRecentJobPosts(resp?.data?.jobPosts);
    } else {
      console.log('###Error While fetching Job Details');
    }
  }

  //Everytime the screen loads, We need to fetch the latest Job For the loggedIn Company...
  useEffect(()=> {
    fetchLoggedInCompayInfo();
  }, []);

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 xl:gap-4 px-5 mt-2'>
      <div className='w-full md:w-2/3 xl:w-3/4 flex flex-col py-8 gap-4 bg-white rounded-md shadow-md px-4'>
        <p
          className='text-xl md:text-2xl font-semibold text-gray-500'
        >
          Job Post
        </p>
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type={'text'}
            placeholder={'eg. Software Engineer'}
            label={'Job Title'}
            name={'jobTitle'}
            register={register('jobTitle', {
              required:'Job Title is Mandatory'
            })}
            error={errors?.jobTitle ? errors?.jobTitle?.message : ''}
          />
          
          <div className='w-full flex flex-col md:flex-row gap-8'>
            <div className='w-full md:w-1/2 flex flex-col justify-center mt-2'>
              <p className='text-gray-600 text-sm mb-1'>Job Type</p>
              <JobType 
                jobType={jobType}
                setJobType={setJobType} 
              />
            </div>
            <div className='w-full md:w-1/2 '>
              <TextInput
                type={'text'}
                placeholder={'eg. 1500'}
                label={'Salary (USD)'}
                name={'salary'}
                register={register('salary', {
                  required:'Job Salary is Mandatory'
                })}
                error={errors?.salary ? errors?.salary?.message : ''}
              />
            </div>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-8'>
            <div className='w-full md:w-1/2'>
              <TextInput
                type={'text'}
                placeholder={'vacancies'}
                label={'No. of vacancies'}
                name={'vacancies'}
                register={register('vacancies', {
                  required:'vacancies is Mandatory'
                })}
                error={errors?.vacancies ? errors?.vacancies?.message : ''}
              />
            </div>
            <div className='w-full md:w-1/2 '>
              <TextInput
                type={'number'}
                placeholder={'Experience'}
                label={'Years Of Experience'}
                name={'experience'}
                register={register('experience', {
                  required:'Required Years Of Experience'
                })}
                error={errors?.experience ? errors?.experience?.message : ''}
              />
            </div>
          </div>

          <TextInput
            type={'text'}
            placeholder={'eg. India'}
            label={'Job Location'}
            name={'location'}
            register={register('location', {
              required:'Job Location is Mandatory'
            })}
            error={errors?.location ? errors?.location?.message : ''}
          />

          <div className='flex flex-col gap-2 justify-center'>
            <label className='text-gray-600 text-sm mb-1' htmlFor="description">Job Description</label>
            <textarea 
              name="description" 
              placeholder='Add Job Description...'
              id="description" 
              cols="30"
              className='rounded border border-gray-400 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-500 text-base px-4 py-2 text-black'
              rows="5"
              {...register('description', {
                required: 'Job Description is Required'
              })}
            />
            {errors?.description && <span className='inline-flex text-xs text-red-500 mt-0.5'>{errors?.description?.message}</span>}
          </div>

          <div className='flex flex-col gap-2 justify-center'>
            <label className='text-gray-600 text-sm mb-1' htmlFor="responsiblity">Core Responsibility</label>
            <textarea 
              name="responsibility" 
              placeholder='Add Job Responsibility...'
              id="responsiblity" 
              cols="30"
              className='rounded border border-gray-400 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-500 text-base px-4 py-2 text-black'
              rows="5"
              {...register('responsibility', {
                required: 'Job responsibility is Required'
              })}
            />
            {errors?.responsibility && <span className='inline-flex text-xs text-red-500 mt-0.5'>{errors?.responsibility?.message}</span>}
          </div>

          <div className='w-full flex justify-center'>
            {isLoading ? 
              <Loading />
            :<CustomButton 
              title={'POST JOB'}
              customBtnStyle={'w-fit inline-flex justify-center rounded-md bg-blue-600 hover:bg-blue-800 px-20 py-2 text-white text-sm font-medium outine-none'}
              type={'submit'}
              />
           }
          </div>
        </form>
      </div>
      <div className="w-full h-fit md:w-1/3 xl:w-1/4 flex flex-col bg-white rounded-md shadow-md gap-3 py-8">
        <p className='text-center font-semibold text-gray-600'>Recent Posts</p>
        { 
          isFetchingRecentJobs ? 
            <Loading /> 
          :recentJobPosts.length === 0 ? 
          (
            <div className='h-[450px] flex justify-center items-center'>
              <p className='text-center font-semibold text-gray-400'>No Recent Job Posted</p>
            </div>
          )
          : <div className='w-5/6 h-full flex flex-col gap-3 mx-auto mt-6'>
            {
              recentJobPosts.slice(0, 4).map((job, index)=> (
                <JobCard jobInfo={job} key={index}/>
              ))
            }
            </div>
        }
      </div>
    </div>
  )
}

export default UploadJob