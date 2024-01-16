import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './component/AuthPage/AuthPage'
import LinkPage from './component/LinksPage/LinkPage'

const App = () => {

  const pathName = window.location.pathname


  return (
    <div className='app'>
        {pathName !== '/' && 
          <p>Test</p>
          
        }
        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path='/links' element={<LinkPage/>}/>
        </Routes>
    </div>
  )
}

export default App