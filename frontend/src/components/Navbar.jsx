import { Flex, Layout, Button, Menu } from 'antd';
import { ShoppingCartOutlined, SunOutlined, PlusSquareOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';



const Navbar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname === '/' ? 'home' : location.pathname.substring(1));
  const onClick = (e) => {
    setCurrent(e.key);
  }
  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "create",
      label: <Link to="/create">Create</Link>
    },
  ];
  return (
    <div style={{ width: '100%', maxWidth: '1140px', }}>
      <Flex justify='space-between' align='center' style={{ margin: '0 auto' }}>
        <Flex>
          <Link
            to="/"
            onClick={() => setCurrent("home")}>
            <div
              style={{
                color: 'white',
                cursor: 'pointer',
                paddingRight: '1em'
              }}
              href="/"
            >
              MERNLearning
              <ShoppingCartOutlined />
            </div>
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[current]}
            items={items}
            onClick={onClick}
            defaultSelectedKeys={['2']}
            style={{ paddingLeft: '1em' }}
          />
        </Flex>

        <Button>
          <SunOutlined />
        </Button>
      </Flex>
    </div>


  );

}

export default Navbar