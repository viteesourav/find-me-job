import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomButton, Header, JobCard, ListBox } from '../components';
import { BiBriefcaseAlt2 } from 'react-icons/bi';
import { BsStar } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { jobTypes, experience, jobs} from '../utils/data';

const FindJobs = () => {
  const[findJobState, setFindJobState] = useState({
    sort: 'Newest',
    page: 1,
    numPage: 1,
    recordCount: 0,
    data: [],
    searchQuery: '',
    jobLocation: '',
    filterJobTypes: [],
    filterExp: []
  })
  const[isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const naviagte = useNavigate();

  //Handle, On JobType/experience CheckBox Selection...[//under evt.target -> checked [true/false] and value holds the checked value.]
  //check if the checked value is already present in the filtereJobTypes, If yes -> Remove it, If not add it.
  const handleOnFilterTypeSelect = (evt, fieldName) => {
    if(findJobState[fieldName].includes(evt.target.value)) {
      //Already Present, Remove it from the list...
      setFindJobState(prevState => {
        let newObj = {...prevState};
        newObj[fieldName] = prevState[fieldName].filter(val => (val !== evt.target.value));
        return newObj;
      })
    } else {
      //Not Present, add it to the list..
      setFindJobState(prevState => {
        let newObj = {...prevState};
        newObj[fieldName] = [...prevState[fieldName], evt.target.value];
        return newObj;
      })
    }
  }

  return (
    <div>
      {/* The Header-> SearchBar and Frequent Search Options */}
      <Header
        title='Find Your Dream Job'
        type='home'
        handleClick={()=> {}}
        searchQuery={findJobState.searchQuery}
        location={findJobState.jobLocation}
        setPageState={setFindJobState}
      />
      
      {/* The Main Container */}
      <div className='container mx-auto flex gap-6 py-8 md:px-5 2xl:gap-10 bg-[#f7fdfd] rounded-md mt-2'>
        {/* Left side Filter Search */}
        <div className='w-1/6 h-fit flex flex-col bg-white shadow-sm'>
          <p className='text-sm md:text-xl lg:text-2xl text-slate-600 font-semibold'>
            Filter Search
          </p>
          {/* Options For Job Types */}
          <div className="py-2">
            <div className="flex items-center mb-3">
              <p className="flex items-center font-semibold gap-2 text-sm md:text-lg lg:text-xl">
                <BiBriefcaseAlt2 />
                Job Type
              </p>
              <button className='block ml-3'>
                <MdOutlineKeyboardArrowDown 
                  className='text-2xl text-slate-700 bg-gray-200 rounded-md' 
                />
              </button>
            </div>
            <div className='flex flex-col gap-2'>
              {
                jobTypes.map((jobName, id) => (
                  <div className='flex items-center justify-start gap-2 text-base md:text-lg' key={id}>
                    <input 
                      type="checkbox" 
                      value={jobName}
                      className='w-5 h-5'
                      onChange={(evt) => handleOnFilterTypeSelect(evt, 'filterJobTypes')}
                    />
                    <span>{jobName}</span>
                  </div>
                ))
              }
            </div>
          </div>
          {/* Options For Experience */}
          <div className="py-2 mt-4">
            <div className="flex items-center mb-3">
              <p className="flex items-center font-semibold gap-2 text-sm md:text-lg lg:text-xl">
                <BsStar />
                Experience
              </p>
              <button className='block ml-3'>
                <MdOutlineKeyboardArrowDown 
                  className='text-2xl text-slate-700 bg-gray-200 rounded-md' 
                />
              </button>
            </div>
            <div className='flex flex-col gap-2'>
              {
                experience.map((exp, id) => (
                  <div className='flex items-center justify-start gap-2 text-base md:text-lg' key={id}>
                    <input 
                      type="checkbox" 
                      value={exp?.value}
                      className='w-5 h-5'
                      onChange={(evt) => handleOnFilterTypeSelect(evt, 'filterExp')}
                    />
                    <span>{exp.title}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {/* Job Card Container */}
        <div className='w-full flex flex-col gap-0 md:gap-2'>
            {/* The main container Header */}
            <div className="w-full h-fit flex justify-between mb-4 items-center">
                <p className='text-lg md:text-xl'>
                  Showing: <span className='font-semibold'>1902</span> Jobs Available
                </p>
                <div className='flex flex-row gap-0 md:gap-2 px-4 items-center'>
                  <p className='text-lg md:text-xl'>
                    Sort By: 
                  </p>
                  <ListBox
                    sort={findJobState.sort}
                    setState={setFindJobState}
                  />
                </div>
            </div>

            {/* Jobs Cards Container */}
            <div className="w-full flex flex-wrap gap-2 md:gap-4 justify-around">
              {
                jobs.map((jobData) => (
                  <JobCard jobInfo={jobData} key={jobData.id}/>
                ))
              }
            </div>
            {/* LoadMore Jobs Btn */}
            {
              findJobState.page > findJobState.numPage && !isFetching &&
              <div className='w-full flex items-center justify-center pt-14'>
                <CustomButton
                  title={'Load More'}
                  customBtnStyle={'text-blue-600 bg-blue-100 text-xs px-4 py-1.5 rounded-full border border-blue-500 focus:outline-none hover:bg-blue-700 hover:text-white'}
                />

              </div>
            }
        </div>
      </div>
    </div>
  )
}

export default FindJobs