import { Footer, Navbar } from "./components"
import { Outlet, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { AboutUs, AuthPage, Companies, CompanyProfile, FindJobs, JobDetail, UploadJob, UserProfile } from "./pages";
import { useSelector } from "react-redux";

const Layout = () => {
  const {user} = useSelector(state => state.user); //Fetching user from store
  const currLocation = useLocation();
  // console.log('loggedIn User:', user);
  return user ? <Outlet /> : <Navigate to='/user-auth' state={{from: currLocation}} replace />
}

function App() {
  const {user} = useSelector(state => state.user); //Fetching user from store
  return (
    <main>
      <Navbar />
      <Routes>
        <Route element = {<Layout />}>
          <Route path="/" element={<Navigate to={'/find-jobs'} replace />} />
          <Route path='/find-jobs' element={<FindJobs />} />
          <Route path='/companies' element={<Companies />} />
          <Route path={
            user?.user?.accountType === 'Seeker' ? '/user-profile' : '/user-profile/:id'
          } element={<UserProfile />} />
          <Route path='/company-profile' element={<CompanyProfile />} />
          <Route path='/company-profile/:id' element={<CompanyProfile />} />
          <Route path='/upload-job' element={<UploadJob />} />
          <Route path='/job-detail/:id' element={<JobDetail />} />
        </Route>
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/user-auth' element={<AuthPage />} />
      </Routes>
      {user && <Footer />}
    </main>
  )
}

export default App
