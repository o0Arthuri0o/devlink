import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import './AuthPage.scss'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies()
    const [isOpenPassword, setIsOpenPassword] = useState(false)

    // setCookie('was', 'yes')
    if (cookies.was && !isLogin) {
        setIsLogin(true)
    }

    





  return (
    <div className='login-wrapper'>
        <div className='login-card'>

            <p>{isLogin ? "Авторизация" : "Регистрация"}</p>


            <div className='password-wrapper'>
                <input type="text" />
            </div>
            

            <div className='password-wrapper'>
                
                <input className={isOpenPassword ? "password-open" : "password-close"} type={isOpenPassword ? 'text' : 'password'} />
                {isOpenPassword ? <IoMdEye onClick={()=> setIsOpenPassword(prev => !prev)} /> : <IoMdEyeOff className='eye' onClick={()=> setIsOpenPassword(prev => !prev)} />}
            </div>
            
            <button>{isLogin ? "Войти" : "Зарегистрироваться"}</button>

            <div className='link-wrapper' >
                <p>Зарегистрироваться</p>
                <p>Войти</p>
            </div>
        </div>
        
    </div>
  )
}

export default AuthPage