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

function ProfilePage() {

  const navigate = useNavigate()
  const links = useSelector((state: RootState) => state.link)

  useEffect(() => {
    if(!links.length) navigate('/links')
  }, [])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [profileEmail, setProfileEmail] = useState('')

  const [selectFile, setSelectFile] = useState()
  // const [uploaded, setUploaded] = useState()
  const filePicker = useRef<HTMLInputElement>(null)

  const handleChange = (event) => {
    console.log(event.target.files)
    setSelectFile(event.target.files[0])
  }

  // const handleUpload = async() => {
  //   if (!selectFile) {
  //     alert("please select a file")
  //     return;
  //   }
  //   const formData = new FormData()
  //   formData.append('upload', selectFile)

  //   const res = await fetch('http://localhost:8000/images/test@22.com', {
  //     method:"POST",
  //     body: formData
  //   })

  //   const data = res.url
  //   // console.log(data)
    
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

  // const handlePick = () => {
  //   filePicker.current.click()
  // }



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

          <div className='upload' style={{backgroundImage: selectFile ? selectFile : ''}} >
            <FaImage/>
            <input 
              ref={filePicker}
              className='hidden'
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
