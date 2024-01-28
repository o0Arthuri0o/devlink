import './Input.scss'

type InputProps = {
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  style?: any
}

const Input = ({placeholder, value, setValue, style}: InputProps) => {
  return (
    <div className='input-wrapper' style={style}>
        <input placeholder={placeholder} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default Input