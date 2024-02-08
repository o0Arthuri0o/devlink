import { useSelector } from 'react-redux'
import './Loader.scss'
import { RootState } from '../../../store'
const Loader = () => {
  const isLoading = useSelector((state: RootState) => state.loading)

  return (

    <div className='big-circle' style={{display: isLoading ? 'flex' : 'none'}}  >
        <p>Загрузка...</p>
    </div>
  )
}

export default Loader