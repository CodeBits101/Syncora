import { useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './components/ProfileCard/ProfileCard';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/profile' element={<ProfileCard />}/>
    </Routes>
     {/* <div className='p-3'>SYNCORA 
      <p className='px-3'>This is project management system </p>
     </div> */}
    </>
  )
}

export default App
