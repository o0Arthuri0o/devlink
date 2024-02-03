import './Header.scss'
import { useState } from 'react'
import { FaLink } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLink } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updatePage } from '../../store/pageSlice';

const Header = ({cookie}: {cookie:string}) => {

  
  const dispatch = useDispatch()
  // const [menuPage, setMenuPage] = useState(`links`)
  const navigate = useNavigate()
  const page = useSelector((state: RootState) => state.page)

  const switchPage = (pageName: string) => {
    dispatch(updatePage(pageName))
    navigate(`/${pageName}`)
  }


  return (


    <div className='menu-wrapper' style={{display: cookie ? 'flex' : 'none'}} >

          <div className='devlink-logo-wrapper'>
            <IoLink/>
            <p>devlinks</p>
          </div>

          <div className='menu-wrapper' >
            <div onClick={() => switchPage('links')}  className={page === 'links' ? 'menu-btn active-menu-btn' : 'menu-btn'}>
              <FaLink />
              <p>Ссылки</p>
            </div>

            <div onClick={() => switchPage('profile')} className={page === 'profile' ? 'menu-btn active-menu-btn' : 'menu-btn'}>
              <CgProfile id='profile-icon' />
              <p>Профиль</p>
            </div>
          </div>

          <div className='preview-btn' onClick={() => switchPage('preview')} >
            <IoMdEye/>
            <p>Превью</p>
          </div>

    </div>


)
}

export default Header