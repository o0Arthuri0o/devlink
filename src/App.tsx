import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './component/AuthPage/AuthPage'
import LinkPage from './component/LinksPage/LinkPage'
import { useCookies } from 'react-cookie'
import Header from './component/Header/Header'
import ProfilePage from './component/ProfilePage/ProfilePage'
import { useEffect, useState } from 'react'
import { UseDispatch, useDispatch } from 'react-redux'
import { update } from './store/profileSlice'
import { getLinks } from './store/linkSlice'
import PreviewPage from './component/PreviewPage/PreviewPage'


const App = () => {

  const dispatch = useDispatch()

  

    useEffect(() => {
      console.log('test')
      const getSrc = async() => {
        const email = cookies.Email
        try {
          const res = await fetch(`${process.env.SERVER_URL}/images/${email}`)
          if(res.url) {
            dispatch(update({type: 'imgSrc', data: res.url}))
            dispatch(update({type: 'file', data: res.url}))
          }

        } catch(err) {
            console.log(err)
        }

      }
      getSrc()

      const fetchGetLinks = async() => {
        const email = cookies.Email
        const res = await fetch(`${process.env.SERVER_URL}/links/${email}`)
        const data = await res.json()
        dispatch(getLinks(data))
      } 
      fetchGetLinks()

      const getProfileInfo = async() => {
        const email = cookies.Email
        const res = await fetch(`${process.env.SERVER_URL}/profile/${email}`)
        const data = await res.json()
        if(data !== 'no user') {

          const {name, surname, new_email} = data
          dispatch(update({type: 'name', data: name}))
          dispatch(update({type: 'surname', data: surname}))
          dispatch(update({type: 'email', data: new_email}))
        }

      }
      getProfileInfo()

  }, [])

  const [cookies] = useCookies()
  

  return (
    <div className='app'>
        
        <Header cookie={cookies.Token} />

        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path='/links' element={<LinkPage/>}/>
            <Route path='/profile' element={<ProfilePage />}/>
            <Route path='/preview' element={<PreviewPage />}/>
        </Routes>
    </div>
  )
}

export default App