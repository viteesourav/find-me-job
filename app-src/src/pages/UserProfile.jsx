import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import { CustomButton, Loading, TextInput } from '../components';
import { DummyProfilePic } from '../assets';
import { ERROR_CODES, dbConnection, handleFileUploads } from '../utils';
import { login, logout } from '../redux/userSlice';

// Renders the Edit form For user Profile Update...
const UserModal = ({isModalOpen, setIsModalOpen, userObj, updateUserInfo}) => {
  const closeModal = () => setIsModalOpen(false);
  const[profileImg, setProfileImg] = useState(userObj?.profileUrl);
  const[resume, setResume] = useState(userObj?.resumeUrl);
  const[isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //lets update the details of the user when we submit...
  const OnSubmit = async (frmObj) => {
    try {
      setIsLoading(true);

      const profilePicUrl = profileImg && (await handleFileUploads(profileImg));
      
      const resumeInfoUrl = resume && (await handleFileUploads(resume));

      const updatedPayload = {
        ...frmObj, 
        profileUrl: profilePicUrl ?? '',
        resumeUrl: resumeInfoUrl ?? '' 
      }

      const resp = await dbConnection({
        url: 'user/updateUserData',
        method: 'PUT',
        data: updatedPayload,
        token: userObj?.token
      });
      setIsLoading(false);
      if(resp?.status === 200) {
        updateUserInfo(prev => ({
          ...prev,
          ...resp?.data
        }));
        dispatch(login({ 
          user: {
                  token: userObj?.token,
                  ...resp?.data
              }
          }))
      } else if(ERROR_CODES.includes(resp?.response?.status)) {
        console.log('###Internal Error: ',resp);
        dispatch(logout());
      }
    } catch (error) {
      console.log("###Error occured while updating User Info", error);
    }finally {
      closeModal();
      console.log("#####Form Submitted Successfully !", frmObj, profileImg, resume);
    }
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
                      <div className='w-full flex flex-col items-center md:flex-row gap-2'>
                        <div className='w-full md:w-1/2'>
                          <p className='text-gray-600 text-sm mb-1'>
                            Upload profile Image 
                          </p>
                          <input 
                            type='file'
                            name='profileImg'
                            id="profileUrl"
                            className='mt-0 md:mt-2'
                            placeholder={profileImg}
                            {...register('profileImg')}
                            onChange = {(evt) => setProfileImg(evt.target?.files[0])}
                          />
                          {
                            errors &&
                              <span className='text-xs text-red-500 mt-0.5'>{errors?.profileImg?.message}</span>
                          }
                        </div>
                        <div className='w-full md:w-1/2'>
                          <p className='text-gray-600 text-sm mb-1'>
                            Upload Resume 
                          </p>
                          <input 
                            type='file'
                            name='resume'
                            id="resume"
                            className='mt-0 md:mt-2'
                            placeholder={resume}
                            {...register('resume')}
                            onChange = {(evt) => setResume(evt.target?.files[0])}
                          />
                          {
                            errors &&
                              <span className='text-xs text-red-500 mt-0.5'>{errors?.resume?.message}</span>
                          }
                        </div>
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
                        {isLoading ? <Loading /> : 
                        <CustomButton 
                        type={'submit'} 
                        title={'Update'}
                        customBtnStyle={'inline-flex justify-center rounded-md bg-blue-600 hover:bg-blue-800 px-8 py-2 text-white text-sm font-medium outine-none'}
                        />
                      }
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
  const[userInfo, setUserInfo ] = useState({});
  const[isOpen, setIsOpen] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //Function to fetch user Details....
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const resp = await dbConnection({
        url: 'user/getUserData',
        method: 'GET',
        token: user?.token
      });

      setIsLoading(false);
      if(resp?.status === 200) {
        if(resp?.data) {
          console.log(resp?.data);
          setUserInfo(resp?.data);
        }
      } else if(ERROR_CODES.includes(resp?.response?.status)) {
        console.log('###Internal Error: ',resp);
        dispatch(logout());
      }
    } catch(err) {
      console.log("###Error while fetching userdata", err);
    } finally {
      console.log("###Fetching user Details...");
    }
  }

  //Lets fetch userDetails, Everytime the page Loads...
  useEffect(()=> {
    fetchUserDetails();
  }, []);
  
  return (
    isLoading ? <Loading /> :
    <div className='container mx-auto flex items-center justify-center px-5 py-10 mt-2'>
     <div className='w-full flex flex-col gap-1 bg-[#fdf7f7] px-10 py-8 rounded-md shadow-lg mx-20'>
      <div className='w-full flex flex-col items-center md:flex-row md:justify-center gap-2 py-2 border border-x-transparent border-t-transparent border-b-2 border-b-gray-400 outline-none rounded-bl-sm rounded-br-sm'>
        <img 
          src={userInfo?.profileUrl ?? DummyProfilePic} 
          alt={userInfo?.firstName +" "+ userInfo?.lastName} 
          className='w-20 h-20 rounded-full m-2'
        />
        <span className='w-fit flex items-center text-xl md:text-2xl font-semibold text-gray-700 gap-2'>
          {userInfo?.firstName +" "+ userInfo?.lastName}
          <FaRegEdit  
            className='text-2xl mx-2 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer' 
            onClick={() => setIsOpen(true)}
          />
        </span>
      </div>
      <div className='w-full flex flex-row justify-between items-center'>
        <p className=' flex items-center gap-2 text-base md:text-lg text-gray-700'>
          <HiLocationMarker className={userInfo?.location ?? 'text-gray-400'} /> {userInfo?.location ?? <span className='text-base text-gray-400'> No Location </span>}
        </p>
        <p className=' flex items-center gap-2 text-base md:text-lg text-gray-700'>
          <AiOutlineMail className={userInfo?.location ?? 'text-gray-400'} /> {userInfo?.email ?? <span className='text-base text-gray-400'> No Email </span>}
        </p>
        <p className=' flex items-center gap-2 text-base md:text-lg text-gray-700'>
          <FiPhoneCall className={userInfo?.location ?? 'text-gray-400'} /> {userInfo?.contact ?? <span className='text-base text-gray-400'> No Contact </span>}
        </p>
      </div>
      <span className='w-fit my-12 text-xl xl:text-2xl mb-2 font-semibold text-blue-600 tracking-wider leading-4'>About</span>
      <p className='w-full mb-2 text-sm md:text-base text-gray-700'>
        {userInfo?.about ?? 
          <span className='text-base text-gray-400'> 
            Tell Us Something About Yourself 😁 
          </span> }
      </p>
     </div>      

     {/* Handles User Modal */}
     <UserModal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen} 
        userObj={{...userInfo, token: user?.token}}
        updateUserInfo = {setUserInfo}
     />
    </div>
  )
}

export default UserProfile