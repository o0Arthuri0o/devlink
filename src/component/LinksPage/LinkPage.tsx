import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const LinkPage = () => {

  const navigate = useNavigate()
  const [cookies] = useCookies()

  useEffect(() => {
    if(!cookies.Token) {
      navigate('/')
    }
  }, [])




  return (
    <div>LinkPage</div>
  )
}

export default LinkPage