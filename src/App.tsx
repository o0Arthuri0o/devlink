import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './component/AuthPage/AuthPage'
import LinkPage from './component/LinksPage/LinkPage'
import Header from './component/Header/Header'
import ProfilePage from './component/ProfilePage/ProfilePage'
import PreviewPage from './component/PreviewPage/PreviewPage'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLinks } from './store/linkSlice'
import { getProfile, update } from './store/profileSlice'


const App = () => {

  const dispatch = useDispatch()
  const user = useUser()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if(user?.id) {
      const fetchLinks = async() => {
        const res = await supabase.from('link_card').select("*").eq("user_id", user.id)
        if(res.error) alert("Ошибка получения ссылок")
        else if(res.data) dispatch(getLinks(res.data))
      }
      fetchLinks()
  
      const fetchProfile = async() => {
        const res = await supabase.from('profile').select("*").eq("user_id", user.id)
        if(res.data.length === 0) {
          const createNewProfile = await supabase.from('profile').insert({user_id: user.id}).select("*").single()
          dispatch(getProfile(...createNewProfile.data))
        } else {
          dispatch(getProfile(...res.data))
        }
      }
      fetchProfile()
  
      const fetchPhoto = async() => {
        const res = await supabase.storage.from('avatar').list(user?.id + '/', {limit: 1})
        if(res.error) {
          console.log(res.error)
          alert('Ошибка загрузки фотографии')
        } if(res.data.length) {
          console.log(res)
          const imgSrc = `https://mtfhvhspnkvkdohoydvq.supabase.co/storage/v1/object/public/avatar/${user.id}/avatar`
          dispatch(update({type: 'imgSrc', data: imgSrc}))
        }
      }
      fetchPhoto()
    }
    console.log('first')
  }, [user])
 

  return (
    <div className='app'>
        
        <Header userId={user?.id} />

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