import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { CiLocationOn } from "react-icons/ci";
import CustomButton from './CustomButton';
import { popularSearch } from '../utils/data';
import { HeroImage } from '../assets';

// function returns the searchInput component..
const SearchInput = ({placeholder, icon, value, searchKey, setSearchValue, style}) => {
    return (
        <div className={`w-full flex items-center md:w-1/3 ${style}`}>
            {icon}
            <input 
                type="text"
                value={value}
                placeholder={placeholder} 
                onChange={(e) => setSearchValue(searchKey, e.target.value)}
                className='w-full p-2 outline-none bg-transparent text-base'
            />
            <AiOutlineCloseCircle 
                className={`${value != "" ? 'flex':'hidden'} text-gray-600 text-xl cursor-pointer`}
                onClick={()=> setSearchValue(searchKey, '')}
            />
        </div>
    )
}

// The Main Header Component...
const Header = ({title, type, handleClick, searchQuery, location, setPageState, isShowSearchBtn}) => {
  
    //Function to handle onClick of Search...
    const handleSearch = () => {
        console.log('###Searched_Query: ', searchQuery);
        console.log('###Searched_Location: ', location);
    }
    
    return (
    <div className='bg-[#f7fdfd]'>
        <div className={`container mx-auto px-5
        ${type ? 'h-[500x]':'h-[300px]'} flex items-center relative`}>
            <div className='w-full z-10'>
                <div className='mb-20'>
                    <p className='font-bold text-slate-500 text-4xl'>
                        {title}
                    </p>
                </div>
                {/* The Search Bar */}
                <div className='w-full flex items-center justify-around bg-white md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full'>
                    <SearchInput 
                        placeholder='Job Title or Keywords'
                        icon={<AiOutlineSearch className='text-gray-600 text-xl' />}
                        value={searchQuery}
                        searchKey={'searchQuery'}
                        setSearchValue={(key, val) => setPageState(key, val)}
                    />
                    <SearchInput 
                        placeholder='Add Country or State'
                        icon={<CiLocationOn className='text-gray-600 text-xl' />}
                        value={location}
                        searchKey={'joblocation'}
                        setSearchValue={(key, val) => setPageState(key, val)}
                    />
                    {isShowSearchBtn && 
                        <CustomButton
                        title={'Search'}
                        customBtnStyle={'text-white py-2 md:py-3 px-3 md:px-10 focus:outline-none bg-blue-600 rounded-full md-rounded-md text-sm md:text-base hover:bg-blue-900'}
                        type={'button'}
                        onClick={handleSearch}
                        />
                    }
                </div>
                {
                    type === 'home' && (
                        <div className='w-full flex flex-wrap gap-3 md:gap-6 py-5 md:py-7'>
                            {
                                popularSearch.map((item, id) => (
                                    <span 
                                        className='w-auto text-sm md:text-base px-4 py-2 tracking-wider text-blue-600 hover:text-blue-700 bg-blue-200 hover:bg-blue-300 rounded-full cursor-pointer' 
                                        key={id}
                                        onClick={() => setPageState('searchQuery', item)}
                                    >
                                        {item}
                                    </span>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {/* Have the Image */}
            <div className='absolute w-1/3 h-full -top-[24px] right-16 md:-top-[10px] lg:-top-[50px]'>
                <img 
                    src={HeroImage} 
                    alt="HeroImage"
                    className='object-contain bg-white-100 outine-none rounded-2xl' 
                />
            </div>
        </div>
    </div>
  )
}

export default Header