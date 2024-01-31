import './LinkCard.scss'
import { FaGripLines } from "react-icons/fa";
import Input from '../Input/Input';
import { VscLink } from "react-icons/vsc";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdColorFill } from "react-icons/io";
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../../../store/linkSlice';

type LinkCardProps = {
  index: number
  user_email: string
  title: string,
  link: string,
  color: string,
  text_color: string,
  id: string,
  deleteLink: any
}


const LinkCard = ({title, user_email ,link, color, text_color, index, id, deleteLink}: LinkCardProps) => {

  const dispatch = useDispatch()

  const [titleState, setTitleState] = useState(title)
  const [linkState, setLinkState] = useState(link)

  const [btnColor, setBtnColor] = useState(color)
  const [textColor, setTextColor] = useState(text_color)

  const colorRef = useRef<HTMLInputElement>(null);
  const textColorRef = useRef<HTMLInputElement>(null);



  const handleColorChange = () => {
      if (colorRef.current) {
        setBtnColor(colorRef.current.value);
    }
  }

  const handleColorClick = () => {
      colorRef.current?.click()
  }

  

  const handleTextColorChange = () => {
      if (textColorRef.current) {
        setTextColor(textColorRef.current.value);
    }
  }

  const handleTextColorClick = () => {
    textColorRef.current?.click()
  }

  useEffect(() => {
    const updatedLink = {
      user_email: user_email,
      title: titleState,
      link: linkState,
      color: btnColor,
      text_color: textColor,
      id: id
    }
    dispatch(update(updatedLink))

  }, [titleState, linkState, btnColor, textColor])

  useEffect(() => {
    if(colorRef.current && color) {
      colorRef.current.value = color
    }
    if(textColorRef.current && text_color){
      textColorRef.current.value = text_color
    }

  }, [])


  return (
    <div className='link-card'>

      <div className='link-card-text'>
        <div className='link-card-number' >
          <FaGripLines/>
          <p>Ссылка №{index+1}</p>
        </div>
        <p className='remove-link' onClick={()=>deleteLink(id)} >Удалить</p>
      </div>

      <label  className='link-card-input' >
        Название ссылки
        <MdDriveFileRenameOutline/>
        <Input padding={true} value={titleState} setValue={setTitleState} />
      </label>

      <label  className='link-card-input' >
        Ссылка
        <VscLink/>
        <Input padding={true}  value={linkState} setValue={setLinkState} />
      </label>

      <div onClick={handleColorClick} onChange={handleColorChange}  className='link-card-color-picker' style={{background: btnColor}} >
        Цвет ссылки
        <IoMdColorFill/>
        <input ref={colorRef} type="color"  />
      </div>

      <div onClick={handleTextColorClick} onChange={handleTextColorChange} className='link-card-color-picker'  style={{color: textColor}}>
        Цвет текста
        <input ref={textColorRef} type="color"  />
      </div>

    </div>
  )
}

export default LinkCard