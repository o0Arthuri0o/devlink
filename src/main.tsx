import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './store/index'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.API_KEY}`)


ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store} >
        <SessionContextProvider supabaseClient = {supabase}>
          <App />
        </SessionContextProvider>
        
      </Provider>
      
    </React.StrictMode>
  </BrowserRouter>
)
