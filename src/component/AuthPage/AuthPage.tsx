import { useEffect, useState } from 'react'
import './AuthPage.scss'
import Input from '../UI/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const AuthPage = () => {

    const user = useUser()
    const supabase = useSupabaseClient()

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.id) {
            navigate('/links')
            // console.log('links')
        }
        // console.log('user',user)
    }, [user])

    const signUpAndLogin = async(email: string) => {
        const {error} = await supabase.auth.signInWithOtp({
            email: email
        })
        // console.log('data',data)
        // console.log(email)
        if(error) {
            alert('Убедитесь, что ввели реальную почту. Ошибка коммуникации с базой данных.')
            console.log(error)
        } else {
            alert('Проверьте свою почту, чтобы завершить вход')
            // console.log(data)
        }
    }

   

    return (
        <div className='login-wrapper'>
            <div className='login-card'>

                <p>Авторизация</p>

                <Input placeholder='Почта' value={email} setValue={setEmail} />

                <button onClick={() => signUpAndLogin(email.trim()) } >Войти</button>

              
            </div>
            
        </div>
    )
}

export default AuthPage