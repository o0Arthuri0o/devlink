import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import Input from '../UI/Input/Input';
import { VscLink } from "react-icons/vsc";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdColorFill } from "react-icons/io";
import './LinkPage.scss'

const LinkPage = () => {

  const navigate = useNavigate()
  const [cookies] = useCookies()

  useEffect(() => {
    if(!cookies.Token) {
      navigate('/')
    }
  }, [])




  return (
    <div className='links-page-wrapper'>

      <div className='live-preview-wrapper'>

        <img src="../../src/assets/phone1.png" alt="Телефон" />

        <div className='live-preview'>
          TEST
        </div>

      </div>

      <div className='edit-link-wrapper'>

        <div className='edit-link-text'>
          <p>Добавьте ссылки на ваши ресурсы</p>
          <p>Добавляйте/редактируйте/удаляйте ссылки и делитесь со всем миром!</p>
        </div>

        <div className='add-link-btn'>
          <p>+ Добавить новую ссылку</p>
        </div>

        <div className='links-card-wrapper'>

          <div className='link-card'>

            <div className='link-card-text'>
              <div className='link-card-number' >
                <FaGripLines/>
                <p>Ссылка №{1}</p>
              </div>
              <p className='remove-link' >Удалить</p>
            </div>

            <label  className='link-card-input' >
              Название ссылки
              <MdDriveFileRenameOutline/>
              <Input padding={true} />
            </label>

            <label  className='link-card-input' >
              Ссылка
              <VscLink/>
              <Input padding={true} />
            </label>

            <div  className='link-card-color-picker' >
              Цвет ссылки
              <IoMdColorFill/>
              <input type="color" />
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default LinkPage