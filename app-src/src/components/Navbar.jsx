import React, { Fragment, useDebugValue, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai';
import CustomButton from './CustomButton';
import { users } from '../utils/data'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice.js';

//creating a Menu List for the user to see options when loggedin
//NOTE: The below is a component that is internally used in this screen only [that's why no seperate component for this]
const MenuList = ({user, onClick}) => {
  
  const dispatch = useDispatch();

  const handleLogOut = () => {
    console.log('###Logger: Logging You Out');
    dispatch(logout());
    onClick();
  };

  return (
    <div>
      <Menu as={'div'} className='inline-block text-left relative'>
        <div className='flex'>
          <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20'>
            <div className='leading-[80px] flex flex-col items-start'>
              <p className='text-sm font-semibold'> 
                { user?.firstName ?? user?.name } 
              </p>
              <span className='text-sm text-blue-600'>
                { user?.jobTitle ?? user?.email}
              </span>
            </div>
            <img className='w-10 h-10 rounded-full object-cover' 
                src={user?.profileUrl} 
                alt='user Profile img' />
            <BiChevronDown className='h-8 w-8 text-slate-600' aria-hidden />
          </Menu.Button>
        </div>

        {/* Transition for the Menu Option from headless ui */}
        <Transition 
          as={Fragment}
          enter=" transition ease-out duration-100"
          enterFrom=" transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items 
          className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none'
          >
            <div className='p-1'>
              <Menu.Item>
                {
                  ({active}) => (
                    <Link 
                    to={`${user?.accountType ? `/user-profile`:`/company-profile/${user?._id}`}`}
                    className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                    >
                      <CgProfile className={`mr-2 h-5 w-5`}
                        aria-hidden='true'
                      />
                      {user?.accountType ? "User Profile" : "Company Profile"}
                    </Link>
                  )
                }
              </Menu.Item> 

              <Menu.Item>
                {
                  ({active}) => (
                    <button className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} flex items-center w-full rounded-md p-2 text-sm`}
                    onClick = {handleLogOut}
                    >
                      <AiOutlineLogout className='mr-2 h-5 w-5'/>
                      Logout
                    </button>
                  )
                }
              </Menu.Item>           
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}


const Navbar = () => {
  const {user} = useSelector(state => state.user);
  const[isOpen, setIsOpen] = useState(false);  //Handles the Opening and closing of hamburger menu in Mobile View.

  //Toggels the whole nav hamburger menu...
  const handleOnNavClose = () => {
    setIsOpen(prevState => !prevState);
  }

  return (
    <>
      <div className='relative bg-[#f7fdfd] z-50'>
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div>
            <Link to='/' className='text-blue-600 font-bold text-3xl'>Work<span className='text-[#167ccb]'>Sphere</span></Link>
          </div>
          
          {/* Nav Menu Options to display */}
          <ul className='hidden lg:flex gap-10 text-base'>
            <li className='border border-b-2 border-transparent outline-none rounded-b-sm hover:border-b-blue-500 transition hover:delay-300 ease-in-out hover:shadow-lg hover:shadow-slate-200'>
              <Link to='/job/jobPosts'>Find Jobs</Link>
            </li>
            <li className='border border-b-2 border-transparent outline-none rounded-b-sm hover:border-b-blue-500 transition hover:delay-300 ease-in-out hover:shadow-lg hover:shadow-slate-200'>
              <Link to={'/company/getAll'}>Companies</Link>
            </li>
            <li className='border border-b-2 border-transparent outline-none rounded-b-sm hover:border-b-blue-500 transition hover:delay-300 ease-in-out hover:shadow-lg hover:shadow-slate-200'>
              <Link to={'/upload-job'}>Upload Jobs</Link>
            </li>
            <li className='border border-b-2 border-transparent outline-none rounded-b-sm hover:border-b-blue-500 transition hover:delay-300 ease-in-out hover:shadow-lg hover:shadow-slate-200'>
              <Link to={'/about-us'}>About Us</Link>
            </li>
          </ul>
          {/* Profile Details: If user not loggedin Go to auth Page else show the userProfile */}
          {/* For BreakPoint > 1024px */}
          <div className='hidden lg:block'>
            {
              !user?.token ? (
                <Link to={'/user-auth'}>
                  <CustomButton title={'Sign In'} 
                    type={'button'} 
                    customBtnStyle={' text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'}  
                    onClick={()=> {
                      console.log('#####SignIn btn Clicked');
                      handleOnNavClose();
                      }
                    }
                  />
                </Link>
              ): (
                <div>
                  <MenuList user={user} />
                </div>
              )
            }
          </div>
          {/* Button to Open the Mobile Menu */}
          <button className='block lg:hidden text-slate-900'
          onClick = {handleOnNavClose}
          >
           {
            isOpen ? <AiOutlineClose size={26} /> :<HiMenuAlt3 size={26}/>
           }
          </button>
        </nav>

        {/* For BreakPoint <=1024 px [Mobile View] */}
        <div 
        className={`${isOpen ? 'absolute flex bg-white' : 'hidden'} container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          {/* Note: Here the OnCLick Close the DropDown as soon as You click on the Link */}
          <Link to={'/job/jobPosts'} onClick={handleOnNavClose}>Find Jobs</Link>  
          <Link to={'/company/getAll'} onClick={handleOnNavClose}>Companies</Link>
          <Link to={'/upload-jobs'} onClick={handleOnNavClose}>Upload Jobs</Link>    
          <Link to={'/about-us'} onClick={handleOnNavClose}>About Us</Link> 
          <div className='w-full py-10'>
            {
              !user?.token ? (
                <Link to={'/user-auth'}>
                  <CustomButton title={'Sign In'} 
                    type={'button'} 
                    customBtnStyle={' text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'}  
                    onClick={()=>{ 
                      console.log('#####SignIn btn Clicked');
                      handleOnNavClose(); 
                      }
                  }
                  />
                </Link>
              ): (
                <div>
                  <MenuList user={user} onClick={handleOnNavClose} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar