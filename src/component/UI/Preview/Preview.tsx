import { useSelector } from 'react-redux'
import './Preview.scss'
import { RootState } from '../../../store'

const Preview = () => {

  const links = useSelector((state: RootState) => state.link)

  return (
    <div className='live-preview-wrapper'>

        <img src="../../src/assets/phone2.png" alt="Телефон" />

        <div className='live-preview'>
          
          <div className='skeleton-avatar'></div>
          <div className='skeleton-name'></div>
          <div className='skeleton-email'></div>

          <div className='link-preview-wrapper'>
            {links.map(link => 
                <a key={link.id} 
                  href={link.link} 
                  target="_blank"
                  style={{background:link.color, color: link.text_color, display: link.title ? "flex" : "none"}}
                  className='link-preview'>
                    {link.title}
                </a>
            )}
          </div>

        </div>

  </div>
  )
}

export default Preview