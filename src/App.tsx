import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './component/AuthPage/AuthPage'
import LinkPage from './component/LinksPage/LinkPage'
import { useCookies } from 'react-cookie'
import Header from './component/Header/Header'
import ProfilePage from './component/ProfilePage/ProfilePage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update } from './store/profileSlice'
import { getLinks} from './store/linkSlice'
import PreviewPage from './component/PreviewPage/PreviewPage'
import { createClient } from '@supabase/supabase-js'
import { RootState } from './store'

const App = () => {

  const dispatch = useDispatch()
  

  // Create Supabase client
  const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.API_KEY}`)
  console.log(supabase)
  // Upload file using standard upload
  // async function uploadFile(file) {
  //   const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
  //   if (error) {
  //     // Handle error
  //   } else {
  //     // Handle success
  //   }
  // }
  

    useEffect(() => {
      console.log('test')
      const getSrc = async() => {
        const token = cookies.Token
        const fileType = JSON.parse(localStorage.getItem('LastFileType'))
        if(!fileType){
          return
        }

        try {

          const { data, error } = await supabase
            .storage
            .from('public/avatar')
            .download(`${token}.${fileType}`)

          const imageUrl = URL.createObjectURL(data)  
          dispatch(update({type: 'imgSrc', data: imageUrl}))

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