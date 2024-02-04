import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import './AuthPage.scss'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import Input from '../UI/Input/Input';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLogin, setIsLogin] = useState(false)
    const [cookies, setCookies] = useCookies()
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.Email && cookies.Token) {
            navigate('/links')
        }
    }, [])


    const signUpAndLogin = async(email: string, password: string) => {

        let endpoint;
        isLogin ? endpoint = 'login' : endpoint = 'signup';

        try {
            
            const res = await fetch(`${process.env.SERVER_URL}/${endpoint}`, {
                method: 'POST',
                // headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
                body: JSON.stringify({email, password})
            })

            const data = await res.json()
            return data

        } catch(err) {
            console.log(err)
        }
        
        
    }

    const handleClick = async(email: string, password: string) => {

        const res = await signUpAndLogin(email, password)
        if(res.email && res.token) {
            setCookies('Email', res.email)
            setCookies('Token', res.token)
            navigate('/links')
        } else if(res.detail) {
            alert(res.detail)
        } else {
            alert('Ошибка сервера')
        }
        console.log(res)
    }

   
    





    return (
        <div className='login-wrapper'>
            <div className='login-card'>

                <p>{isLogin ? "Авторизация" : "Регистрация"}</p>

                <Input placeholder='Почта' value={email} setValue={setEmail} />
                
                <div className='password-wrapper'>
                    <input placeholder='Пароль' type={isOpenPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isOpenPassword ? <IoMdEye onClick={()=> setIsOpenPassword(prev => !prev)} /> : <IoMdEyeOff className='eye' onClick={()=> setIsOpenPassword(prev => !prev)} />}
                </div>
                
                <button onClick={() => handleClick(email.trim(), password.trim()) } >{isLogin ? "Войти" : "Зарегистрироваться"}</button>

                <div className='link-wrapper' >
                    <p onClick={() => setIsLogin(false)} >Зарегистрироваться</p>
                    <p onClick={() => setIsLogin(true)} >Войти</p>
                </div>
            </div>
            
        </div>
    )
}

export default AuthPage