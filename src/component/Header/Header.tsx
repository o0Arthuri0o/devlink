import './Header.scss'
import { FaLink } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLink } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updatePage } from '../../store/pageSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Header = ({userId}: {userId:string}) => {

  const supabase = useSupabaseClient()
  const dispatch = useDispatch()
  // const [menuPage, setMenuPage] = useState(`links`)
  const navigate = useNavigate()
  const page = useSelector((state: RootState) => state.page)

  const switchPage = (pageName: string) => {
    dispatch(updatePage(pageName))
    navigate(`/${pageName}`)
  }

  const signOut = async() => {
    const {error} = await supabase.auth.signOut()

    if(error) {
      alert('Ошибка выхода')
      console.log(error)
    }
  }


  return (


    <div className='menu-wrapper' style={{display: userId   ? 'flex' : 'none'}} >

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

          <div className='preview-btn' onClick={signOut} >
            <p>Выйти</p>
          </div>

    </div>


)
}

export default Header