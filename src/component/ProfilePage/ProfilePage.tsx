import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

  const dispatch = useDispatch()

  const [cookies] = useCookies()
  const navigate = useNavigate()
  const links = useSelector((state: RootState) => state.link)

  useEffect(() => {
    if(!links.length) navigate('/links')
  }, [])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [profileEmail, setProfileEmail] = useState('')

  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer>('')
  const [selectedFile, setSelectedFile] = useState()
  const [uploaded, setUploaded] = useState('')
  const filePicker = useRef<HTMLInputElement>(null)
  const filePickerContainer = useRef<HTMLInputElement>(null)

  const handleChange = async(event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result){
        setImgUrl(reader.result);
      }
    }

    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file)
    }
  }

  useEffect(() => {

    if(selectedFile?.lastModified){
      const newProfileInfo = {
        email: profileEmail, 
        name: name,
        surname: surname,
        imgSrc: imgUrl,
        timeStamp: selectedFile?.lastModified
      }

      dispatch(update(newProfileInfo))

    }

  }, [selectedFile, name, surname, profileEmail])


 

  // const handleUpload = async(selectFile: any) => {

  //   if (!selectFile) {
  //     alert("please select a file")
  //     return;
  //   }
  //   const formData = new FormData()
  //   formData.append('upload', selectFile)

  //   const res = await fetch( `${process.env.SERVER_URL}/images/${email}`, {
  //     method:"POST",
  //     body: formData
  //   })

  //   const data = res.url
  //   console.log(data)
    
  //   setUploaded(`${data}?random=${Math.random()}`) // добавляем случайную строку к URL-адресу
  //   setSelectFile(null)
  // }


  // useEffect(() => {
  //   const getSrc = async() => {
  //     const res = await fetch('http://localhost:8000/images/test@22.com')
  
  //     if(res.url) setUploaded(res.url)
  //   }
  //   getSrc()
  // }, [])

  



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
            {imgUrl &&
              <img src={`${imgUrl}`} alt="Загруженное изображение"/>
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
         
          <Input placeholder='Имя' value={name} setValue={setName} />
          <Input placeholder='Фамилия' value={surname} setValue={setSurname} />
          <Input placeholder='Почта' value={profileEmail} setValue={setProfileEmail} />


        </div>


        <hr />
        <div className='save-btn' >
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
