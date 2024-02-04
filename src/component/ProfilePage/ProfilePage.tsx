import { useEffect, useRef, ChangeEvent} from 'react'
import { Profile } from '../../store/profileSlice';
import './ProfilePage.scss'
import Preview from '../UI/Preview/Preview'
import { FaImage } from "react-icons/fa6";
import Input from '../UI/Input/Input'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useCookies } from 'react-cookie'
import { update } from '../../store/profileSlice'
import { useDispatch } from 'react-redux'
import { updatePage } from '../../store/pageSlice';
import { createClient } from '@supabase/supabase-js';



function ProfilePage() {

  // const [selectedFile, setSelectedFile] = useState()
  const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.API_KEY}`)
  const [cookies] = useCookies()
  const navigate = useNavigate()  

  useEffect(() => {
    if(!links.length) {
      navigate('/links')
      dispatch(updatePage('links'))
    }
  }, [])

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

    const token = cookies.Token
    const myNewFile = new File([file], token , {type: file.type});
    localStorage.setItem('LastFileType', JSON.stringify(myNewFile.type.split('/')[1]))
    console.log(myNewFile)

    reader.onloadend = () => {
      if (reader.result){
        dispatch(update({type: 'imgSrc', data: reader.result}));
      }
    }

    if (file) {
      reader.readAsDataURL(myNewFile);
      // setSelectedFile(file)
      dispatch(update({type: 'file', data: myNewFile}))
    }
  }



  const updateInputs = (type: keyof Profile) => {


    return (event: any) => {
      dispatch(update({type: type, data: event}))
    }
  }

 

  const uploadImage = async() => {

    const token = cookies.Token
    const fileType = JSON.parse(localStorage.getItem('LastFileType'))
    if(fileType) {

      const deleteOLD = await supabase.storage.from('avatar').remove([`${token}.${fileType}`])
      const res = await supabase.storage.from('avatar').upload(`${token}.${fileType}`, profile.file)
      console.log(res)
      
      console.log(`public/avatar/${token}.${fileType}`)
    }
    
    
  }

  const uploadProfileInfo = async() => {
      const email = cookies.Email

      const uploadInfo = {
        name: profile.name,
        surname: profile.surname,
        profileEmail: profile.email
      }
          
      try {
        const res = await fetch(`${process.env.SERVER_URL}/profile/${email}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
          body: JSON.stringify(uploadInfo)
        })
        const data = await res.json()
        if(data === 'error') alert('Упс, ошибочка сервера')
      } catch(err) {
        console.log(err)
      }
      
      
      
          
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
              accept='image/*, .png, .jpg, .web, .svg'
              />
          </div>

          <p>Доступные форматы: png, jpg, web, svg. Желательно размеры 1024х1024</p>

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
