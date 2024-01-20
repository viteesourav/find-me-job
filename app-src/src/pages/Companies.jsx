import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CompanyCard, CustomButton, Header, ListBox, Loading } from '../components';
import { companies } from '../utils/data';

const Companies = () => {
  const[companyState, setCompanyState] = useState({
    sort: 'Newest',
    page: 1,
    numPage: 1,
    recordCount: 0,
    data: [],
    searchQuery: '',
    cmpLocation: '',
  });
  const[isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //As the Component Mounts, We need to update the page's State with Company Data..
  useEffect(()=> {
    setIsFetching(true);
    //Fetch Companys List after 3 sec..
    setTimeout(()=> {
      setIsFetching(false);
      setCompanyState(prevState => ({
        ...prevState,
        data: companies ? companies : []
      }));
    }, 2000);
  }, []);

  return (
    <div className='w-full bg-[#fdf7f7]'>
      {/* This adds the Search bar */}
      <Header
        title={'Find Your Dream Company'}
        handleClick={() => {}}
        searchQuery={companyState.searchQuery}
        location={companyState.cmpLocation}
        setPageState={setCompanyState}
      />
      {/* AFter Search bar */}
      <div className="container mx-auto px-5 flex flex-col gap-5 2xl:gap-10 py-6 bg-white rounded-md">
        {/* The Sort Header */}
        <div className="w-full flex flex-row justify-between">
          <p className='text-lg md:text-xl'>
            Showing: <span className='font-semibold'>1902</span> Company Available
          </p>
          <div className='flex flex-row gap-0 md:gap-2 px-4 items-center'>
            <p className='text-lg md:text-xl'>
              Sort By: 
            </p>
            <ListBox
              sort={companyState.sort}
              setState={setCompanyState}
            />
          </div>
        </div>
        {/* Company informations */}
        {
          isFetching ? (
            // Render a loading Indicator until we fetch the Companies...
            <Loading />
          ) : (
            // Once Fetched, Show the Company Card...
            <div className='w-full flex flex-col gap-2'>
              <div className='w-full flex flex-row flex-wrap gap-6 justify-around'>
              {
                companyState.data?.length > 0 && 
                  companyState.data.map((companyInfo, index) => (
                    <CompanyCard 
                      company={companyInfo}
                      key={index}
                    />
                  ))
              }
              </div>
              <p className='text-sm md:text-lg text-right'>
                {companyState.data?.length} Records out of {companyState.recordCount}
              </p>
            </div>
          )
        }
        {/* LoadMore Company Btn */}
        {
              companyState.page > companyState.numPage && !isFetching &&
              <div className='w-full flex items-center justify-center pt-14'>
                <CustomButton
                  title={'Load More'}
                  customBtnStyle={'text-blue-600 bg-blue-100 text-xs px-10 py-1.5 rounded-full border border-blue-500 focus:outline-none hover:bg-blue-700 hover:text-white'}
                  onClick={()=>{}}
                />

              </div>
            }
      </div>
    </div>
  )
}

export default Companies