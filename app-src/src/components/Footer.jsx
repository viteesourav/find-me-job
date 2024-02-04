import React, { useRef, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi'
import { footerLinks } from '../utils/data';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import CustomButton from './CustomButton';

const Footer = () => {
  const btnNewsLetterref = useRef(null);
  const [validateNewsLetterError, setValidateNewsLetterError] = useState("");
  const handleSubscribeClick = () => {
    btnNewsLetterref.current.focus();
    setValidateNewsLetterError(btnNewsLetterref.current.validationMessage); //Re-render the DOM to show the error message for invalid newsLetter email.
    console.log('###You Subscribed to out NewsLetter', btnNewsLetterref); //Printing the DOM Object using ref. 
  }

  return (
    <footer className='text-white mt-20'>
      {/* This shows the wave pattern in the footer */}
      <div className='overflow-x-hidden -mb-0.5'>
      <svg
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            fill: "#1d4ed8",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <path d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z' />
        </svg>
      </div>
      {/* The Footer container */}
      <div className='bg-[#1d4ed8]'>
        <div className='container px-5 py-20 mx-auto'>
          <div className='w-full flex flex-wrap gap-10 justify-between -mb-10 -px-10'>
            {footerLinks.map(({id, title, links}) => (
              <div key={id} className='w-auto px-4'>
                {/* Footer Header Titles */}
                <h2 className='font-medium text-sm tracking-widest mb-3'>
                  {title}
                </h2>
                {/* Footer MenuItems */}
                <div className='mb-10 flex flex-col gap-3'>
                  {links.map((linkItem, index) => (
                    <Link to={'/'}  className='text-gray-300 text-sm hover:text-white' key={index}>
                      {linkItem}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* NewsLetter Subscription */}
        <div className=''>
          <p className='container mx-auto px-5 text-white mt-2'>
            Subscribe to our Newsletter
          </p>
          <div className='container mx-auto px-5 pb-8 flex flex-wrap items-center justify-between'>
              <div className='w-full md:w-2/4 lg:w-1/3 h-16 flex item-center justify-center md:justify-start gap-4'>
                <TextInput 
                  customStyles='w-full flex flex-grow w-[450px] md:w-[300px] 2xl:w-80 bg-gray-100 mb-2'
                  type='email'
                  placeholder='Email Address'
                  ref={btnNewsLetterref}
                  error={btnNewsLetterref?.current?.validationMessage}
                />
                <CustomButton 
                  title={'Subscribe'}
                  customBtnStyle={'block bg-blue-800 text-white px-4 py-3 text-md rounded hover:bg-[#001a36] focus:outline-none flex flex-col item-center mt-2 h-[50px] mt-2 flex-grow mr-18'}
                  onClick={handleSubscribeClick}         
                />
              </div>
              <span className='inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto gap-5'>
                    <a className='text-white text-xl hover:scale-125 ease-in-out duration-300' 
                      href='/'>
                        <FaFacebookF />
                    </a>
                    <a className='text-white text-xl hover:scale-125 ease-in-out duration-300' 
                      href='/'>
                        <FiInstagram />
                    </a>
                    <a className='text-white text-xl hover:scale-125 ease-in-out duration-300' 
                      href='/'>
                        <FaTwitter />
                    </a>
                    <a className='text-white text-xl hover:scale-125 ease-in-out duration-300' 
                      href='/'>
                        <FaLinkedin />
                    </a>
              </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer