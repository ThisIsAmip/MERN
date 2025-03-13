import { Flex, Layout, Button, Menu } from 'antd';
import { ShoppingCartOutlined, SunOutlined, PlusSquareOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    setCurrent(e.key);
  }
  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "about",
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