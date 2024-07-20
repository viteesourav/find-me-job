import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { Office } from '../assets';
import { SignUp } from '../components';

const AuthPage = () => {
  const {user} = useSelector(state => state.user); //get the user form the redux store.. 
  const[open, setOpen] = useState(true);

  //Basically, You fetch the details of the current page, using useLocation hook.
  const location = useLocation();
  const naviagte = useNavigate();
  let naviagtedFrom = location?.state?.from?.pathname || '/';  //If previous path not found, redirect to home page.
  // console.log('####', naviagtedFrom);
  //If the userToken Exist i.e User is already loggedin redirect him to where he came from to this page...
  if(user && user?.token) {
    return naviagte(naviagtedFrom, {replace: true});
  }

  return (
    <div className='w-full'>
      <img src={Office} alt="Office" className='object-contain' />
      <SignUp open={open} setOpen={setOpen} />
      <div className='flex justify-center mt-3'>
      {/* <button
        className='bg-yellow-200 px-2 py-2 rounded'
        onClick={() => setOpen(prevState => !prevState)}
      >
        Toggel Login Dialog
      </button> */}
      </div>
    </div>
  )
}

export default AuthPage