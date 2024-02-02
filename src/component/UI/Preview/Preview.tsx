import { useSelector } from 'react-redux'
import './Preview.scss'
import { RootState } from '../../../store'
import { FaArrowRightLong } from "react-icons/fa6";

const Preview = () => {

  const links = useSelector((state: RootState) => state.link)
  const profile = useSelector((state: RootState) => state.profile)

  

  return (
    <div className='preview-ui-wrapper' >

      <img src="../../src/assets/phone2.png" alt="Телефон" />

      <div className='live-preview'>

        {profile.imgSrc ? 
          <img src={profile.imgSrc} alt="Аватар" />
          : <div className='skeleton-avatar'></div>
        }
        {profile.name || profile.surname ? 
          <p>{profile.name +' ' + profile.surname}</p>
          :<div className='skeleton-name'></div>
        }
        {
          profile.email ? 
          <p>{profile.email}</p>
          :<div className='skeleton-email'></div>
        }

        <div className='link-preview-wrapper'>
          {links.map(link => 
              <a key={link.id} 
                href={link.link} 
                target="_blank"
                style={{background:link.color, color: link.text_color, display: link.title ? "flex" : "none"}}
                className='link-preview'>
                  {link.title}
                  <FaArrowRightLong/>
              </a>
          )}
        </div>

      </div>

  </div>
  )
}

export default Preview