import React, { useRef, useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './component/AuthPage/AuthPage'
import LinkPage from './component/LinksPage/LinkPage'
import { useCookies } from 'react-cookie'
import { FaLink } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLink } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";


const App = () => {

  const [cookies] = useCookies()
  const [menuPage, setMenuPage] = useState('links')

  const switchMenuBtn = (name: string) => {
    setMenuPage(name)
  }
  

  return (
    <div className='app'>
        <div className='menu-wrapper' style={{display: cookies.Token ? 'flex' : 'none'}} >

          <div className='devlink-logo-wrapper'>
            <IoLink/>
            <p>devlinks</p>
          </div>

          <div className='menu-wrapper' >
            <div onClick={() => setMenuPage('links')}  className={menuPage === 'links' ? 'menu-btn active-menu-btn' : 'menu-btn'}>
              <FaLink />
              <p>Ссылки</p>
            </div>

            <div onClick={() => setMenuPage('profile')} className={menuPage === 'profile' ? 'menu-btn active-menu-btn' : 'menu-btn'}>
              <CgProfile id='profile-icon' />
              <p>Профиль</p>
            </div>
          </div>

          <div className='preview-btn'>
            <IoMdEye/>
            <p>Превью</p>
          </div>

        </div>

        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path='/links' element={<LinkPage/>}/>
        </Routes>
    </div>
  )
}

export default App