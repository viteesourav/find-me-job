import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomButton, Header, JobCard, ListBox, Loading } from '../components';
import { BiBriefcaseAlt2 } from 'react-icons/bi';
import { BsStar } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { jobTypes, experience, jobs} from '../utils/data';
import { dbConnection, updateUrl } from '../utils';

const FindJobs = () => {
  const[findJobState, setFindJobState] = useState({
    sort: 'Newest',
    filterJobTypes: [],
    filterExp: ''
  });
  const [searchBar, SetSearchBar] = useState({
    searchQuery: '',
    jobLocation: ''
  });
  const[jobsInfo, setJobInfo] = useState({
    page: 1,
    numPage: 1,
    recordCount: 0,
    data: [],
  });
  const[isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const naviagteTo = useNavigate();

  //Handle Fetching latest Jobs from server...[based on query Params]
  const fetchJobs = async (url) => {
    try {
      setIsFetching(true);
      
      const resp = await dbConnection({
        url,
        method: 'GET'
      })
      setIsFetching(false);

      if(resp?.status === 200) {
        console.log("###Fetch Jobs Successful", resp);
        setJobInfo(prevState => ({
          ...prevState,
          data: resp?.data?.jobs,
          numPage: resp?.data?.noOfPages,
          page: resp?.data?.pageNo,
          recordCount: resp?.data?.total
        }))
      }
    } catch (error) {
      console.log("###Error while Fetching Jobs", error);
    } finally {
      console.log("###Fetching Latest Jobs");
    }
  }


  // As the component Mounts, Fetch the Job data from the server...
  useEffect(()=> {
    let url_path = location.pathname;
    fetchJobs(url_path);
  }, []);

  //As the user toggels the checkbox with jobTypes, exp and Sort ---> fetch the updated job List...
  useEffect(()=> {
    let url_path = updateUrl({
      navigate: naviagteTo,
      currpageLocation: location,
      pageNum: findJobState.pageNum,
      sort: findJobState.sort,
      jobType: findJobState.filterJobTypes.length > 0 ? findJobState.filterJobTypes.join(',') : '',
      exp: findJobState.filterExp
    });
    fetchJobs(url_path);
  }, [findJobState])

  //TODO: Implement DeBounce search For the search Bar...

  //Handle, On JobType/experience CheckBox Selection...[//under evt.target -> checked [true/false] and value holds the checked value.]
  //check if the checked value is already present in the filtereJobTypes, If yes -> Remove it, If not add it.
  const handleOnFilterTypeSelect = evt => {
    console.log("###Event: ", evt);
    let updatedJobTypeFilter = [];
      
    //So, If a checkbox is unchecked and filteredJobType used to Hold that Value ---> Remove that the val from list...
    if(!evt.target.checked && findJobState.filterJobTypes.includes(evt.target.value)) {
      updatedJobTypeFilter = findJobState.filterJobTypes.filter(ele => ele !== evt.target.value);
    }
    //So, If a checkbox is checked and filteredJobType doesn't Hold that Value ---> Add that val to the list...
    if(evt.target.checked && !findJobState.filterJobTypes.includes(evt.target.value)) {
      updatedJobTypeFilter = [...findJobState.filterJobTypes, evt.target.value]
    }

    setFindJobState(prev => ({
      ...prev,
      filterJobTypes: updatedJobTypeFilter
    }))
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
        isShowSearchBtn = {false}
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
                      onChange={(evt) => handleOnFilterTypeSelect(evt)}
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
                      checked = {findJobState.filterExp === exp?.value}
                      onChange={(evt) => evt?.target?.value === findJobState.filterExp ? 
                        setFindJobState(prev => ({...prev, filterExp: ''})) : 
                         setFindJobState(prev => ({...prev, filterExp: exp?.value}))
                        }
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
                  Showing: <span className='font-semibold'>{jobsInfo.recordCount}</span> Jobs Available
                </p>
                <div className='flex flex-row gap-0 md:gap-2 px-4 items-center'>
                  <p className='text-lg md:text-xl'>
                    Sort By: 
                  </p>
                  <ListBox
                    sort={findJobState.sort}
                    setState={(val) => setFindJobState(prev => ({...prev, sort: val}))}
                  />
                </div>
            </div>

            {/* Jobs Cards Container */}
            <div className="w-full flex flex-wrap gap-2 md:gap-4 justify-around">
              {
                isFetching ? <Loading /> 
                : jobsInfo.data.map((jobData) => (
                    <JobCard jobInfo={jobData} key={jobData.id}/>
                  ))
              }
            </div>
            {/* LoadMore Jobs Btn */}
            {
              jobsInfo.page > jobsInfo.numPage && !isFetching &&
              <div className='w-full flex items-center justify-center pt-14'>
                <CustomButton
                  title={'Load More'}
                  customBtnStyle={'text-blue-600 bg-blue-100 text-xs px-10 py-1.5 rounded-full border border-blue-500 focus:outline-none hover:bg-blue-700 hover:text-white'}
                />

              </div>
            }
        </div>
      </div>
    </div>
  )
}

export default FindJobs