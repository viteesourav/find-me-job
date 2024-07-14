import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CompanyCard, CustomButton, Header, ListBox, Loading } from '../components';
import { companies } from '../utils/data';
import { ERROR_CODES, dbConnection, updateUrl } from '../utils';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Companies = () => {
  const[isFetching, setIsFetching] = useState(false);

  // Holds the user action state for updating the query....
  const[companyState, setCompanyState] = useState({
    searchQuery: '',
    joblocation: '',
  });
  
  const[companySort, setCompanySort] = useState('Newest');
  
  // Fetch latest data of companines as per url-query...
  const[companiesInfo, setCompanyInfo] = useState({
    data: [],
    page: 1,
    numPage: 1,
    recordCount: 0
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //We need to update the URL with query params, Our API Needs it...
  const modifyUrlPath = () => {
    return updateUrl({
      navigate,
      currpageLocation: location,
      pageNum: companiesInfo.page,
      searchQuery: companyState.searchQuery,
      joblocation: companyState.joblocation,
      sort: companySort
    });
  }

  //Handles fetching companies...
  const fetchCompanies = async (url_path) => {
    try {
      setIsFetching(true);

      const resp = await dbConnection({
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
      } else if(ERROR_CODES.includes(resp?.response?.status)) {
        dispatch(logout());
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

  //Applying the concept of DeBouncing OnSearch bar for Search Efficiency....
  
  //3. Now lets write a function to handle the debounce of search bar... 
  //[It will Make the Call to fetch data, Once user stop typing in searchbar for 2s]
  const sendReqDebounce = debounce(async(newSearchUrl) => {
    await fetchCompanies(newSearchUrl);
    console.log("###Handle debouncing Search");
  }, 800);
  
  //2.This memorize the sendReqDeBounce Function thorugh all the Form Re-renders...
  const handleSearchDebounce = useCallback((newSearchUrl) => sendReqDebounce(newSearchUrl),
  []);
  
  //1.Handle State changes from the Search Component..
  const handleOnSearchBarEdit = (searchKey, searchValue) => {
    
    let searchPayload = {
      navigate,
      currpageLocation: location,
      pageNum: companiesInfo.page,
      searchQuery: companyState.searchQuery,
      joblocation: companyState.joblocation,
      sort: companySort
    }
    searchPayload[searchKey] = searchValue;

    //Updating the search Input State Variables.....
    setCompanyState(prevState => {
      let updatedState = {...prevState};
      updatedState[searchKey] = searchValue;
      return updatedState;
    })

    //Getting a new URL for the debouncing feature For the Search Bar...
    let newSearchUrl = updateUrl(searchPayload);
    handleSearchDebounce(newSearchUrl);
  }


  //As the Component Mounts, We need to update the page's State with Company Data..
  useEffect(()=> {
    console.log("###First time componentLoad");
    let url = modifyUrlPath();
    fetchCompanies(url);
  }, []);

  //As companyStates update when we change companyOrder, we need to re-fetch data...
  useEffect(()=> {
    let url = modifyUrlPath();
    fetchCompanies(url);
    // console.log("##Rerendering");
  }, [companySort])

  return (
    <div className='w-full bg-[#fdf7f7]'>
      {/* This adds the Search bar */}
      <Header
        title={'Find Your Dream Company'}
        handleClick={() => {}}
        searchQuery={companyState.searchQuery}
        location={companyState.joblocation}
        setPageState={(key, val) => handleOnSearchBarEdit(key, val)}
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
              sort={companySort}
              setState={setCompanySort}
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