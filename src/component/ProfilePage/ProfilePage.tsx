import { useEffect, useRef, ChangeEvent} from 'react'
import { Profile } from '../../store/profileSlice';
import './ProfilePage.scss'
import Preview from '../UI/Preview/Preview'
import { FaImage } from "react-icons/fa6";
import Input from '../UI/Input/Input'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { update } from '../../store/profileSlice'
import { useDispatch } from 'react-redux'
import { updatePage } from '../../store/pageSlice';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import {v4 as uuidv4} from 'uuid'

export let photoUuid = '';

function ProfilePage() {


  const navigate = useNavigate()  

  useEffect(() => {
    if(!links.length) {
      navigate('/links')
      dispatch(updatePage('links'))
    }
  }, [])

  const user = useUser()
  const supabase = useSupabaseClient()
  const links = useSelector((state: RootState) => state.link)
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()


  
  const filePicker = useRef<HTMLInputElement>(null)
  const filePickerContainer = useRef<HTMLInputElement>(null)

  const handleChange = async(event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    console.log(file)

    
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result){
        dispatch(update({type: 'imgSrc', data: reader.result}));
      }
    }

    if (file) {
      reader.readAsDataURL(file);
      dispatch(update({type: 'file', data: file}))
    }
  }



  const updateInputs = (type: keyof Profile) => {
    return (event: any) => {
      dispatch(update({type: type, data: event}))
    }
  }

 

  const uploadImage = async() => {
        // photoUuid = uuidv4()
        const res = await supabase.storage.from('avatar').upload(user.id + '/avatar', profile.file, {
          upsert: true,
        })
        if(res.error) {
          console.log(res.error)
          alert('Ошибка загрузки')
        }
  }

  const uploadProfileInfo = async() => {

      const res = await supabase
        .from('profile')
        .update({name: profile.name, surname: profile.surname, email: profile.email})
        .eq("id", profile.id)
        .select("*")

      if(res.error) alert('Ошибка сохранения профайла')
  }

  const saveAllInfo = () => {
    uploadImage()
    uploadProfileInfo()
  }


  return (
    <div className='edit-page-wrapper' >

      <div className='live-preview-wrapper'>
        <Preview/>
      </div>
      

      <div className='edit-link_profile-wrapper'  >

        <div className='edit-link_profile-text'>
          <p>Найстройка профиля</p>
          <p>Добавьте свои данные, чтобы придать индивидуальность вашему профилю</p>
        </div>

        <div className='upload-wrapper' >
          <p>Фотография профиля</p>

          <div ref={filePickerContainer} onClick={() => filePicker.current?.click()} className='upload'>
            <FaImage/>
            {profile.imgSrc &&
              <img src={`${profile.imgSrc}`}  alt="Загруженное изображение"/>
            }
          
            <input 
              ref={filePicker}
              type="file" 
              onChange={(e) => handleChange(e)} 
              accept='image/*,.jpg'
              />
          </div>

          <p>Доступный формат: jpg. Желательные размеры 1024х1024</p>

        </div>

        <div className='info-wrapper'>

          <p>Контактная информация</p>
         
          <Input placeholder='Имя' value={profile.name} setValue={updateInputs('name')} />
          <Input placeholder='Фамилия' value={profile.surname} setValue={updateInputs('surname')} />
          <Input placeholder='Почта' value={profile.email} setValue={updateInputs('email')} />


        </div>


        <hr />
        <div className='save-btn' onClick={saveAllInfo} >
          Сохранить
        </div>

      </div>

    </div>
  )
}

export default ProfilePage
