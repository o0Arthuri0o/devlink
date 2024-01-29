import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function ProfilePage() {
  // const [selectFile, setSelectFile] = useState()
  // const [uploaded, setUploaded] = useState()
  // const filePicker = useRef()

  // const handleChange = (event) => {
  //   console.log(event.target.files)
  //   setSelectFile(event.target.files[0])
  // }

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

  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWdAbWFpbC5jb20iLCJpYXQiOjE3MDU0MDk2NTUsImV4cCI6MTcwNTQxMzI1NX0.m96qm6V8rZlwg38YAeXj5d7A34JvgSTUZ0UDfK2OMdY'
  // function parseJwt (token) {
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
  //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload);
  // }
  // console.log(parseJwt(token).email)

  return (
    <>
      {/* <button onClick={handlePick} >Загрузить фото</button>
      <input 
        ref={filePicker}
        className='hidden'
        type="file" 
        onChange={(e) => handleChange(e)} 
        accept='image/*, .png, .jpg, .web, .svg'
      />
      <button  onClick={handleUpload} >Upload now!</button> */}

      {/*uploaded &&
        <div>
          <h2>{uploaded.name}</h2> 
          <img src={uploaded} alt='' width="200" />
        </div>
      */}
      ProfilePage
    </>
  )
}

export default ProfilePage
