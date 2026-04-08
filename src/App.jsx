import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Layout, Typography} from "antd";
import Home from "./paginas/Home.jsx";
import ExercisePage from "./paginas/ExercisePage.jsx";

const { Header, Content, Footer } = Layout
const { Title } = Typography


function App() {

  return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ background: '#001529', display: 'flex', alignItems: 'center' }}>
            <Title level={4} style={{ color: '#fff', margin: 0 }}>🧠 Java Logic Trainer</Title>
          </Header>
          <Content style={{ padding: '24px', background: '#f5f5f5' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercise/:id" element={<ExercisePage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Java Logic Trainer ©2026</Footer>
        </Layout>
      </Router>
  )
}

export default App
