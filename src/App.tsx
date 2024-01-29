import React, { useRef, useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './component/AuthPage/AuthPage'
import LinkPage from './component/LinksPage/LinkPage'
import { useCookies } from 'react-cookie'
import Header from './component/Header/Header'
import ProfilePage from './component/ProfilePage/ProfilePage'



const App = () => {

  const [cookies] = useCookies()
  

  return (
    <div className='app'>
        
        <Header cookie={cookies.Token} />

        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path='/links' element={<LinkPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
    </div>
  )
}

export default App