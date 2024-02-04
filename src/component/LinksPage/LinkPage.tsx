import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './LinkPage.scss'
import LinkCard from '../UI/LinkCard/LinkCard';
import { useDispatch, useSelector } from 'react-redux';
import {  add, removeLink } from '../../store/linkSlice';
import { RootState } from '../../store/index';
import Preview from '../UI/Preview/Preview';



export type LinkCard = {
  user_email: string
  title: string,
  link: string,
  color: string,
  text_color?: string,
  id: string,
}

const LinkPage = () => {

  const generateTempleId = () => {
    const date = new Date
    const salt = Math.floor(Math.random() * 100)
    return date.getSeconds() + `${salt}` + date.getMinutes()
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [cookies] = useCookies()
  // const [links, setLinks] = useState<Link[]>()

  useEffect(() => {
    if(!cookies.Token) {
      navigate('/')
    }

  }, [])

  const links = useSelector((state: RootState) => state.link)
  
  const fetchPostLinks = async(links: LinkCard[]) => {

    try {
      const res = await fetch(`${process.env.SERVER_URL}/links`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(links)
      })
      const data = await res.json()
      if(data !== 'ok') alert('Ошибка сервера')
      return data


    } catch(err) {
      console.log(err)
    }
  }

  const saveLinks = async(links: LinkCard[]) => {
    const res = await fetchPostLinks(links)
    if(res !== 'ok'){
        alert('Сервачок упал, упс!1!')
    }

  } 

  const addNewLink = () => {
    const email = cookies.Email
    const newLink = {
      user_email: email,
      title: '',
      link: '',
      color: '',
      text_color: '',
      id: `${generateTempleId()+1}`
    }
    dispatch(add(newLink))
  }

  const fetchDeleteLink = async(id: string) => {
    try {

      fetch(`${process.env.SERVER_URL}/links/${id}`, {
         method: 'DELETE'
      })
      

    } catch(err) {
      console.error(err)
    }
   
  }

  const deleteLink = (id: string) => {
    if(id.length > 7) {
       fetchDeleteLink(id)
    }
    dispatch(removeLink(id))
  }


  return (
    <div className='edit-page-wrapper'>
      
      <div className='live-preview-wrapper' >
        <Preview/>
      </div>
        

      <div className='edit-link_profile-wrapper'>

        <div className='edit-link_profile-text'>
          <p>Добавьте ссылки на ваши ресурсы</p>
          <p>Добавляйте/редактируйте/удаляйте ссылки и делитесь со всем миром!</p>
        </div>

        <div className='add-link-btn' onClick={addNewLink} >
          <p>+ Добавить новую ссылку</p>
        </div>

        <div className='links-card-wrapper'>

          {
            links.map((link, index) => 
              <LinkCard {...link} deleteLink={deleteLink} index={index} key={link.id} />  
            )
          }
         
        </div>

        <hr />

        <div className='save-btn' onClick={() => saveLinks(links)} >
          Сохранить
        </div>

      </div>

    </div>
  )
}

export default LinkPage