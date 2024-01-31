import './Header.scss'
import { useState } from 'react'
import { FaLink } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLink } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Header = ({cookie}: {cookie:string}) => {

  const [menuPage, setMenuPage] = useState('links')
  const navigate = useNavigate()

  const switchPage = (pageName: string) => {
    setMenuPage(pageName)
    navigate(`/${pageName}`)
  }


  return (


    <div className='menu-wrapper' style={{display: cookie ? 'flex' : 'none'}} >

          <div className='devlink-logo-wrapper'>
            <IoLink/>
            <p>devlinks</p>
          </div>

          <div className='menu-wrapper' >
            <div onClick={() => switchPage('links')}  className={menuPage === 'links' ? 'menu-btn active-menu-btn' : 'menu-btn'}>
              <FaLink />
              <p>Ссылки</p>
            </div>

            <div onClick={() => switchPage('profile')} className={menuPage === 'profile' ? 'menu-btn active-menu-btn' : 'menu-btn'}>
              <CgProfile id='profile-icon' />
              <p>Профиль</p>
            </div>
          </div>

          <div className='preview-btn'>
            <IoMdEye/>
            <p>Превью</p>
          </div>

    </div>


)
}

export default Header