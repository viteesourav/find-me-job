import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { companies, jobs } from '../utils/data';
import { CustomButton, JobCard, Loading, TextInput } from '../components';
import { FiEdit3, FiUpload } from 'react-icons/fi';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react';
import { CgClose } from "react-icons/cg";
import { dbConnection, handleFileUploads } from '../utils';
import { login } from '../redux/userSlice';

//Function Component -> Show Compnay Info Edit Modal [Popup] [*** NOTE: Handled the image upload and storing image using cloudinary ***]
const CompanyModal = ({isShowForm, toggelForm, companyData}) => {
  const closeModal = () => toggelForm(false);
  const [profileImg, setProfileImg] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  // handle update company-Info...
  const OnSubmit = async(frmObj) => {

    setIsLoading(true);
    //handle uploading the profileImg..
    const imgUrl = profileImg && (await handleFileUploads(profileImg));

    const updatePayload = imgUrl ? {...frmObj, profileUrl: imgUrl, authorId: companyData._id} : {...frmObj, authorId: companyData._id};

    //handle API call to update company-profile Info...
    try {
      const res = await dbConnection({
        url: 'company/companyProfile',
        data: updatePayload,
        method: 'PUT',
        token: companyData?.token
      });
      setIsLoading(false);
      if(res.status === 200) {
        if(res.data) {
          res.data.token = companyData?.token;
        }
        
        dispatch(login({
          user: res.data
        }));
        
        console.log('####Update Successful', res);  
        setTimeout(()=> window.location.reload(), 1500); //reload the current Page...
      } else {
        console.log('###Internal Error: ',res);
      }
      closeModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("#####Form Submitted Successfully !", frmObj);
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
    defaultValues: {...companyData}
  })

  //NOTE: defaultValues, set the fromData bydefault, You will be able to edit it, No Need to assign value attribute to each input field

  // console.log('#####getValue:', getValues());
  // console.log('#####Data:', companyData);
  return (
    <>
      <Transition appear show={isShowForm ?? false } as={Fragment}>
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
                                <p className='text-lg md:text-xl font-semibold text-gray-600'>Edit Company Profile</p>
                                <CgClose 
                                  className='text-lg md:text-xl font-semibold text-red-400 hover:text-red-500 cursor-pointer' 
                                  onClick={closeModal}
                                />
                            </Dialog.Title>
                            <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(OnSubmit)}>
                                <TextInput 
                                    type='text'
                                    name='name'
                                    label='Company Name'
                                    placeholder={companyData?.name}
                                    register={register('name', {
                                        required: 'Name is Manadatory'
                                    })}
                                    error= {errors?.name ? errors.name?.message : ''}
                                />
                                <TextInput 
                                    type='text'
                                    name='location'
                                    label='Location/Address'
                                    placeholder={companyData?.location}
                                    register={register('location', {
                                        required: 'Location is Manadatory'
                                    })}
                                    error= {errors?.location ? errors.location?.message : ''}
                                />
                                <div className='w-full flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between'>
                                  <TextInput 
                                      type='text'
                                      name='contact'
                                      label='Contact Info'
                                      placeholder={companyData?.contact}
                                      register={register('contact', {
                                          required: 'Contact is Manadatory'
                                      })}
                                      error= {errors?.contact ? errors?.contact?.message : ''}
                                  />
                                  <div className='w-2/4 flex flex-col justify-center'>
                                    <p className='text-gray-600 text-sm mb-1'>
                                      Upload Logo 
                                    </p>
                                    <input 
                                      type="file" 
                                      name="profileUrl" 
                                      id="profileUrl"
                                      className='mt-0 md:mt-2'
                                      {...register('profileUrl')}
                                      onChange={(evt) => (setProfileImg(evt.target?.files[0]))} 
                                    />
                                    {
                                        errors && (
                                            <span className='text-xs text-red-500 mt-0.5'>{errors?.profileUrl?.message}</span>
                                        )
                                    }
                                  </div>
                                </div>
                                <div className='w-full flex flex-col'>
                                  <p className='text-gray-600 text-sm mb-1'>
                                      About Your company
                                  </p>
                                  <textarea 
                                    name="about" 
                                    id="cabout" 
                                    cols="30" 
                                    rows="10" 
                                    placeholder={companyData?.about}
                                    className='rounded border border-gray-400 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-500 text-base px-4 py-2 text-black'
                                    {...register('about', {
                                      required: 'Write a few lines about Your company'
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
                                  { isLoading ? 
                                      <Loading /> 
                                      :<CustomButton 
                                          type={'submit'} 
                                          title={'Update'}
                                          customBtnStyle={'inline-flex justify-center rounded-md bg-blue-600 hover:bg-blue-800 px-8 py-2 text-white text-sm font-medium outine-none'}
                                      />}
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

// Functional Component -> Company Profile
const CompanyProfile = () => {
  const urlParams = useParams();
  const {user} = useSelector(state => state.user);
  const[companyInfo, setCompanyInfo] = useState({});
  const[isLoading, setIsLoading] = useState(false); //Handles showing loading while fetching data..
  const[openForm, setOpenForm] = useState(false); //handles the Edit company Modal popup...

  //fetch company Info...
  const fetchCompanyData = async () => {
    setIsLoading(true);    
    let id = (urlParams.id && urlParams.id !== undefined ? urlParams.id : user?._id); //if id is coming in params, else take it from redux state..

    try {
      let resp = await dbConnection({
        url: 'company/companyProfile/' + id,
        token: user?.token,
        method: 'GET'
      });
      setIsLoading(false);
      setCompanyInfo(resp?.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }


  //As the Component Mount's, Based on the id, fetch the respective Company Info..
  useEffect(()=>{
    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    })
    fetchCompanyData();
  }, []);

  return (
    isLoading ? (
      <div className='container mx-auto px-5 h-32'>
        <Loading />
      </div>
    ) : (
      <div className='container mx-auto px-5'>
        <div className='w-full flex flex-col gap-2'>
          {/* The Company Profile Header */}
          <div className='w-full flex flex-col md:flex-row justify-between py-4'>
            <p className='text-lg md:text-xl text-gray-600'>
              Welcome, <span className='font-semibold'>{companyInfo?.name}</span>
            </p>
            {/* Check wether to show edit company Profile or not */}
            {
              user?.accountType === undefined && user?._id === companyInfo?._id
              && <div className='flex items-center justify-around gap-4'>
                <CustomButton 
                  iconRight={<FiEdit3 />}
                  onClick={()=>setOpenForm(true)}
                  customBtnStyle={'py-2 px-3 md:px-5 focus:outline-none bg-blue-600 hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600'}
                />
                <Link to={'/upload-job'}>
                  <CustomButton 
                    title={'Upload Job'}
                    iconRight={<FiUpload />}
                    customBtnStyle={'py-1 px-3 md:px-5 focus:outline-none bg-blue-600 hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600'}
                  />
                </Link>
              </div>

            }
          </div>
          {/* Header's Info Footer bar */}
          <div className='w-full flex flex-col justify-start md:flex-row md:justify-around'>
            <p className='flex items-center gap-2 text-base md:text-lg text-gray-700'>
              <HiLocationMarker /> {companyInfo?.location ?? 'No Location'}
            </p>
            <p className='flex items-center gap-2 text-base md:text-lg text-gray-700'>
              <AiOutlineMail /> {companyInfo?.email}
            </p>
            <p className='flex items-center gap-2 text-base md:text-lg text-gray-700'>
              <FiPhoneCall /> {companyInfo?.contact ?? 'No Contact'}
            </p>
          </div>
          {/* Job Posts info */}
          <div className='flex flex-col justify-center items-center py-5'>
            <p className='text-xl md:text-2xl font-semibold text-blue-700'>{companyInfo?.jobPosts?.length}</p>
            <span className='block text-xl md:text-2xl text-gray-600 font-bold'>Job posted</span>
          </div>
          {/* Display Job Cards */}
          <div className='w-full px-5 flex flex-col md:flex-row md:flex-wrap gap-3 md:justify-around'>
            {
              companyInfo.jobPosts && 
                companyInfo.jobPosts.map((job, index)=>(
                    <JobCard
                      jobInfo={job}
                      key={index}
                    />
              ))
            }
          </div>
        </div>
        <div>
          <CompanyModal 
            isShowForm={openForm}
            toggelForm={setOpenForm}
            companyData={{...companyInfo, token: user?.token}}
          />
        </div>
      </div>
    )
  )
}

export default CompanyProfile