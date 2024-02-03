import './PreviewPage.scss' 
import Preview from '../UI/Preview/Preview'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useCookies } from 'react-cookie'


const PreviewPage = () => {
  
  const pushRef = useRef<HTMLDivElement | null>(null)
  const [cookies] = useCookies()
  let token = cookies.Token
  token = token.split('-').join('.')
  console.log(process.env.READY_URL)

  const copyLinkToReadyPage = (token:string) => {
    const url = `${process.env.READY_URL}/${token}`
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

  const links = useSelector((state: RootState) => state.link)
  

  return (
    <div className='preview-page-wrapper' >
       <div ref={pushRef} className='hidden' >Скопировано</div>
        <Preview />
        <div onClick={() => copyLinkToReadyPage(token)} className='preview-btn'>Поделиться</div>
    </div>
  )
}

export default PreviewPage