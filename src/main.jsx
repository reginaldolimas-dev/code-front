import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ConfigProvider} from 'antd'
import ptBR from 'antd/locale/pt_BR'

createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={ptBR}>
    <App />
    </ConfigProvider>,
)
