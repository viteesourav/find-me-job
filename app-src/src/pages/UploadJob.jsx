import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomButton, JobType, ListBox, TextInput } from '../components'

// Upload Job Form to post new Jobs [*** uses react-hook-form ***]
const UploadJob = () => {
  const[jobType, setJobType] = useState('Full-Time');
  const[errMsg, setErrMsg] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState:{errors}
  } = useForm({
    mode:'onChange'
  })
  const onSubmit = (frmObj) => {
    console.log('###Form Submited Data: ', frmObj);
    console.log('###Form State: ', getValues());
  }
  return (
    <div className='container mx-auto px-5 bg-white rounded-md mt-2 shadow-md'>
      <div className='w-full flex flex-col py-8 gap-4'>
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
            <label className='text-gray-600 text-sm mb-1' htmlFor="responsiblity">JCore Responsibility</label>
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
            <CustomButton 
              title={'POST JOB'}
              customBtnStyle={'w-fit inline-flex justify-center rounded-md bg-blue-600 hover:bg-blue-800 px-20 py-2 text-white text-sm font-medium outine-none'}
              type={'submit'}
              />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadJob