import './PreviewPage.scss' 
import Preview from '../UI/Preview/Preview'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useUser } from '@supabase/auth-helpers-react'


const PreviewPage = () => {

   const links = useSelector((state: RootState) => state.link)
  const pushRef = useRef<HTMLDivElement | null>(null)
  const user = useUser()

  const copyLinkToReadyPage = () => {
    const imgToken = JSON.parse(localStorage.getItem('imgToken'))
    const url = `${process.env.READY_URL}/${user?.id}.${imgToken}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .catch((err) => console.log(err))

      pushRef.current?.classList.remove('hidden')
      pushRef.current?.classList.add('alert')
      setTimeout(()=> {
        pushRef.current?.classList.remove('alert')
        pushRef.current?.classList.add('hidden')
      
      }, 2000)
    } else {
      alert('Ваш браузер не позволяет сохранить вашу ссылку в буфер обмен')
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    if(!links.length) navigate('/links')
  }, [])

 
  

  return (
    <div className='preview-page-wrapper' >
       <div ref={pushRef} className='hidden' >Скопировано</div>
        <Preview />
        <div onClick={() => copyLinkToReadyPage()} className='preview-btn'>Поделиться</div>
    </div>
  )
}

export default PreviewPage