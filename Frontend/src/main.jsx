import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageSwitcher from "./switer"
import i18n from './i18n';
ReactDOM.createRoot(document.getElementById('root')).render(
  
  
  <React.StrictMode>
      <App />
    <ToastContainer />
  </React.StrictMode>,
)

