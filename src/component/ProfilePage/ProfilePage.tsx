import { useEffect, useRef, useState } from 'react'
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

function ProfilePage() {



  const [cookies] = useCookies()
  const navigate = useNavigate()  

  useEffect(() => {
    if(!links.length) navigate('/links')
  }, [])

  const links = useSelector((state: RootState) => state.link)
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState()


  
  const filePicker = useRef<HTMLInputElement>(null)
  const filePickerContainer = useRef<HTMLInputElement>(null)

  const handleChange = async(event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result){
        dispatch(update({type: 'imgSrc', data: reader.result}));
      }
    }

    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file)
    }
  }



 

  const uploadImage = async() => {

    if (!selectedFile) {
      alert("please select a file")
      return;
    }

    const formData = new FormData()
    formData.append('upload', selectedFile)

    const email = cookies.Email

    const res = await fetch( `${process.env.SERVER_URL}/images/${email}`, {
      method:"POST",
      body: formData
    })

    const data = res.url
    console.log(data)
    
    dispatch(update({type:'imgSrc', data: data}))
  }


  useEffect(() => {
    const getSrc = async() => {
      const email = cookies.Email
      const res = await fetch(`${process.env.SERVER_URL}/images/${email}`)
  
      if(res.url) dispatch(update({type: 'imgSrc', data: res.url}))
    }
    getSrc()
  }, [])

  const updateInputs = (type: keyof Profile) => {


    return (event) => {
      dispatch(update({type: type, data: event}))
    }
  }



  return (
    <div className='edit-page-wrapper' >

      <Preview/>

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
              <img src={`${profile.imgSrc}`} alt="Загруженное изображение"/>
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
        <div className='save-btn' onClick={uploadImage} >
          Сохранить
        </div>

      </div>

      {/* <button onClick={handlePick} >Загрузить фото</button>
      
      <button  onClick={handleUpload} >Upload now!</button> */}

      {/*uploaded &&
        <div>
          <h2>{uploaded.name}</h2> 
          <img src={uploaded} alt='' width="200" />
        </div>
      */}
    </div>
  )
}

export default ProfilePage
