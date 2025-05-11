import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/common/Router.tsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </>
)
