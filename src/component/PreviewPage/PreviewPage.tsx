import './PreviewPage.scss' 
import Preview from '../UI/Preview/Preview'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


const PreviewPage = () => {


  const navigate = useNavigate()
  useEffect(() => {
    if(!links.length) navigate('/links')
  }, [])

  const links = useSelector((state: RootState) => state.link)
  

  return (
    <div className='preview-page-wrapper' >
        <Preview />
    </div>
  )
}

export default PreviewPage