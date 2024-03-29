import './Input.scss'

type InputProps = {
  placeholder?: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  style?: any,
  padding?: boolean
}

const Input = ({placeholder, value, setValue, style, padding}: InputProps) => {

  let paddingStyle = {}
  if(padding) paddingStyle = {paddingLeft: '35px'}

  return (
    <div className='input-wrapper' style={style}>
        
        <input style={paddingStyle} placeholder={placeholder} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default Input