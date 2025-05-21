import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Documents from './Pages/Documents'
import BrowseDocuments from './Pages/Documents'
import Home from './Pages/Home'
import Upload from './Pages/Upload'
import AuthPage from './Pages/Auth'
import Profile from './Pages/Pofile'

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Home/>} />
      <Route path='/documents' element={<BrowseDocuments/>} />
      <Route path='/upload' element={<Upload/>}/>
       <Route path='/login' element={<AuthPage/>}/>
       <Route path='/profile' element={<Profile/>}/>
    </Routes>
 
     
      
     </BrowserRouter>
    </>
  )
}

export default App
