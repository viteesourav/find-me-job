import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CompanyCard, CustomButton, Header, ListBox, Loading } from '../components';
import { companies } from '../utils/data';
import { fetchData, updateUrl } from '../utils';

const Companies = () => {
  const[isFetching, setIsFetching] = useState(false);
  // Holds the user action state for updating the query....
  const[companyState, setCompanyState] = useState({
    sort: 'Newest',
    searchQuery: '',
    cmpLocation: '',
  });
  // Fetch latest data of companines as per url-query...
  const[companiesInfo, setCompanyInfo] = useState({
    data: [],
    page: 1,
    numPage: 1,
    recordCount: 0
  });
  const location = useLocation();
  const navigate = useNavigate();

  //Handles fetching companies...
  const fetchCompanies = async () => {
    setIsFetching(true);

    //We need to update the URL with query params, Our API Needs it...
    let url_path  = updateUrl({
      navigate,
      currpageLocation: location,
      pageNum: companiesInfo.page,
      searchQuery: companyState.searchQuery,
      Joblocation: companyState.cmpLocation,
      sort: companyState.sort
    })

   try {
     const resp = await fetchData({
       url: url_path,
       method: 'GET'
     });

     if(resp?.status === 200) {
      setCompanyInfo(info =>({
          ...info,
          data: resp?.data?.companies,
          numPage: resp?.data?.pageNo,
          page: resp?.data?.noOfPages,
          recordCount: resp?.data?.total
        }));
        console.log("###fetching Companies Info", resp);
     } else {
        console.log("###Error While fetching Companies Info", resp);
     }
   } catch (error) {
      console.log("###Error While fetching Companies Info", resp);
   } finally {
      setIsFetching(false);
      console.log('###Fetching all comapanies Info...');
   }
  }


  //As the Component Mounts, We need to update the page's State with Company Data..
  useEffect(()=> {
    console.log("###First time componentLoad");
    fetchCompanies();
  }, []);

  //As companyStates update like searchQry, Order or Loaction, we need to re-fetch data...
  useEffect(()=> {
    fetchCompanies();
    // console.log("##Rerendering");
  }, [companyState])

  return (
    <div className='w-full bg-[#fdf7f7]'>
      {/* This adds the Search bar */}
      <Header
        title={'Find Your Dream Company'}
        handleClick={() => {}}
        searchQuery={companyState.searchQuery}
        location={companyState.cmpLocation}
        setPageState={setCompanyState}
        isShowSearchBtn = {false}
      />
      {/* AFter Search bar */}
      <div className="container mx-auto px-5 flex flex-col gap-5 2xl:gap-10 py-6 bg-white rounded-md">
        {/* The Sort Header */}
        <div className="w-full flex flex-row justify-between">
          <p className='text-lg md:text-xl'>
            Showing: <span className='font-semibold'>{companiesInfo.recordCount}</span> Company Available
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
                companiesInfo.data?.length > 0 && 
                companiesInfo.data.map((companyInfo, index) => (
                    <CompanyCard 
                      company={companyInfo}
                      key={index}
                    />
                  ))
              }
              </div>
              <p className='text-sm md:text-lg text-right'>
                {companiesInfo.data?.length} out of {companiesInfo.recordCount} Records
              </p>
            </div>
          )
        }
        {/* LoadMore Company Btn */}
        {
              companiesInfo.page > companiesInfo.numPage && !isFetching &&
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