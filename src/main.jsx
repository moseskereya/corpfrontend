import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProdivder} from './context/ContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <ContextProdivder>
        <App/>
    </ContextProdivder>
  </React.StrictMode>,
)
