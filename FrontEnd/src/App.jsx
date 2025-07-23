import { useState } from 'react'
import './App.css'
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import ProfileCard from './components/ProfileCard/ProfileCard';
import { Routes, Route } from 'react-router-dom';
import AboutDev from './screens/developer/AboutDev';
import AboutProject from './screens/main/AboutProject';
import NotFoundPage from './screens/main/NotFoundPage';
import NoData from './screens/main/NoData';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/profile' element={<ProfileCard />}/>
      <Route path='/dev' element={<AboutDev />}/>
      <Route path='/' element={<AboutProject />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Routes>
     {/* <div className='p-3'>SYNCORA 
      <p className='px-3'>This is project management system </p>
     </div> */}
    </>
  )
}

export default App
