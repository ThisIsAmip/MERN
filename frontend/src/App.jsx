import { Flex, Layout, Row, Button } from 'antd';
import { Route, Routes } from 'react-router-dom';

import Homepage from "./pages/HomePage";
import CreatePage from './pages/CreatePage';
import NavBar from './components/Navbar';
import { Content, Footer, Header } from 'antd/es/layout/layout';


function App() {
  const layoutStyle = {

  };
  return (

    <Layout style={layoutStyle}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NavBar />
      </Header>
      <Content>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/create' element={<CreatePage />} />
        </Routes>
      </Content>
      <Footer>
        Footer
      </Footer>
    </Layout>

  )
}

export default App
