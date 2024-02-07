import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LinkPage.scss'
import LinkCard from '../UI/LinkCard/LinkCard';
import { useDispatch, useSelector } from 'react-redux';
import {  add, removeLink, getLinks } from '../../store/linkSlice';
import { RootState } from '../../store/index';
import Preview from '../UI/Preview/Preview';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { LinkCardType } from '../../store/linkSlice';
import { getProfile, update } from '../../store/profileSlice';




const LinkPage = () => {

  const user = useUser()
  const supabase = useSupabaseClient()
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const links = useSelector((state: RootState) => state.link)



  useEffect(() => {
    if(!user?.id) {
      navigate('/')
      return
    }


  }, [])

  
 

  const saveLinks = async(links: LinkCardType[]) => {
    for(let link of links) {
      const res = await supabase
                        .from('link_card')
                        .update({title: link.title, link: link.link, color: link.color, text_color: link.text_color})
                        .eq("id", link.id)
                        .select("*")
                        .single()
      if(res.error) {
        alert('Ошибка сохранения')
      }
    }

  } 

  const addNewLink = async() => {
    const res = await supabase
      .from('link_card')
      .insert({user_id: user.id})
      .select("*")
      .single()
    if(res.error) alert('Ошибка записи, попробуйте заново')
    else if(res.data) dispatch(add(res.data))
  }


  const deleteLink = async(id: string) => {
    const res = await supabase
      .from('link_card')
      .delete()
      .eq("id", id)
    
    if(res.error) alert('Ошибка удаления. Попробуйте снова.')
    else dispatch(removeLink(id))
    
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