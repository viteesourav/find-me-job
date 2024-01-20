import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import { CustomButton, TextInput } from '../components';

// Renders the Edit form For user Profile Update...
const UserModal = ({isModalOpen, setIsModalOpen, userObj}) => {
  const closeModal = () => setIsModalOpen(false);
  // const[profileIm, setProfileImg] = useState(user?.profileUrl);
  const OnSubmit = (frmObj) => {
    closeModal();
    console.log("#####Form Submitted Successfully !", frmObj);
  }

  // initialise the react-hook-form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState:{errors}
  } = useForm({
    mode: 'onChange',
    defaultValues: {...userObj}
  })

  return (
    <>
      <Transition appear show={isModalOpen ?? false } as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
          <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center mt-20">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white py-6 px-8 text-left align-middle shadow-xl transition-all mt-10">
                  <Dialog.Title
                      as="h3"
                      className="w-full flex justify-between py-2 mb-3"
                  >
                      <p className='text-lg md:text-xl font-semibold text-gray-600'>Edit User Profile</p>
                      <CgClose 
                        className='text-lg md:text-xl font-semibold text-red-400 hover:text-red-500 cursor-pointer' 
                        onClick={closeModal}
                      />
                  </Dialog.Title>
                  <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(OnSubmit)}>
                      <div className='w-full flex flex-col items-center md:flex-row gap-2'>
                        <div className='w-full md:w-1/2'>
                          <TextInput 
                            type='text'
                            name='firstName'
                            label='First Name'
                            placeholder={userObj?.firstName}
                            register={register('firstName', {
                                required: 'First Name is Manadatory'
                            })}
                            error= {errors?.firstName ? errors.firstName?.message : ''}
                          />
                        </div>
                        <div className='w-full md:w-1/2'>
                          <TextInput 
                            type='text'
                            name='lastName'lastName
                            label='Last Name'
                            placeholder={userObj?.lastName}
                            register={register('lastName', {
                                required: 'Last Name is Manadatory'
                            })}
                            error= {errors?.lastName ? errors.lastName?.message : ''}
                          />
                        </div>
                      </div>
                      <div className='w-full flex flex-col items-center md:flex-row gap-2'>
                        <div className='w-full md:w-1/2'>
                          <TextInput 
                            type='text'
                            name='contact'
                            label='Contact'
                            placeholder={userObj?.contact}
                            register={register('contact', {
                                required: 'Contact is Manadatory'
                            })}
                            error= {errors?.contact ? errors.contact?.message : ''}
                          />
                        </div>
                        <div className='w-full md:w-1/2'>
                          <TextInput 
                            type='text'
                            name='location'
                            label='Location'
                            placeholder={userObj?.location}
                            register={register('location', {
                                required: 'Location is Manadatory'
                            })}
                            error= {errors?.location ? errors.location?.message : ''}
                          />
                        </div>
                      </div>
                      <div className='w-full'>
                        <TextInput 
                            type='text'
                            name='jobTitle'
                            label='Job Title'
                            placeholder={userObj?.jobTitle}
                            register={register('jobTitle', {
                                required: 'jobTitle is Manadatory'
                            })}
                            error= {errors?.jobTitle ? errors.jobTitle?.message : ''}
                        />
                      </div>
                      <div className='w-full flex flex-col gap-1'>
                        <label className='text-gray-600 text-sm mb-1' htmlFor="about">About</label>
                        <textarea 
                          name="about" 
                          id="about" 
                          cols="30" 
                          rows="10" 
                          placeholder={userObj?.about}
                          className='rounded border border-gray-400 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-500 text-base px-4 py-2 text-black'
                          {...register('about', {
                            required: 'Write a few lines about YourSelf'
                          })}
                        />
                        {
                            errors && (
                                <span className='text-xs text-red-500 mt-0.5'>{errors?.about?.message}</span>
                            )
                        }
                      </div>
                      {/* The Submit Button */}
                      <div className='mt-2 w-full flex justify-center'>
                        <CustomButton 
                          type={'submit'} 
                          title={'Update'}
                          customBtnStyle={'inline-flex justify-center rounded-md bg-blue-600 hover:bg-blue-800 px-8 py-2 text-white text-sm font-medium outine-none'}
                        />
                      </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


// Renders the user-profile Page..
const UserProfile = () => {
  const {user} = useSelector(state => state.user);
  const[isOpen, setIsOpen] = useState(false);
  
  return (
    <div className='container mx-auto flex items-center justify-center px-5 py-10 mt-2'>
     <div className='w-full flex flex-col gap-1 bg-[#fdf7f7] px-10 py-8 rounded-md shadow-lg mx-20'>
      <div className='w-full flex flex-col items-center md:flex-row md:justify-center gap-2 py-2 border border-x-transparent border-t-transparent border-b-2 border-b-gray-400 outline-none rounded-bl-sm rounded-br-sm'>
        <img 
          src={user?.profileUrl} 
          alt={user?.firstName +" "+ user?.lastName} 
          className='w-20 h-20 rounded-full m-2'
        />
        <span className='w-fit flex items-center text-xl md:text-2xl font-semibold text-gray-700 gap-2'>
          {user?.firstName +" "+ user?.lastName}
          <FaRegEdit  
            className='text-2xl mx-2 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer' 
            onClick={() => setIsOpen(true)}
          />
        </span>
      </div>
      <div className='w-full flex flex-row justify-between items-center'>
        <p className=' flex items-center gap-2 text-base md:text-lg text-gray-700'>
          <HiLocationMarker /> {user?.location}
        </p>
        <p className=' flex items-center gap-2 text-base md:text-lg text-gray-700'>
          <AiOutlineMail /> {user?.email}
        </p>
        <p className=' flex items-center gap-2 text-base md:text-lg text-gray-700'>
          <FiPhoneCall /> {user?.contact}
        </p>
      </div>
      <span className='w-fit mt-5 text-xl mb-2 font-semibold text-blue-600 tracking-wider leading-4'>About</span>
      <p className='w-full mb-2 text-sm md:text-base text-gray-700'>
        {user?.about}
      </p>
     </div>      

     {/* Handles User Modal */}
     <UserModal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen} 
        userObj={user}
     />
    </div>
  )
}

export default UserProfile