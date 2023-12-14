import React, { useState } from "react";
import "./navbar.css";
import { Layout, Menu, Row, Col, Drawer } from "antd";
import { Link } from "react-router-dom";
import {
  CarOutlined,
  CarFilled,
  FileSearchOutlined,
  SettingOutlined,
  // UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

// Specify the return type as JSX.Element
function NavBar(): JSX.Element {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <Header className="app-header">
      <Row justify="space-between">
        <div className="sidebartogl" onClick={toggleDrawer}>
          <MenuOutlined
            style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="menu">
          <AppMenu />
        </div>
      </Row>
      {/* Drawer for small screens */}
      <div>
        <Drawer
          title="Menu"
          placement="left"
          closable={true}
          onClose={toggleDrawer}
          visible={drawerVisible}
          bodyStyle={{ backgroundColor: "#fff" }}
        >
          <AppMenu inline={true} />
        </Drawer>
      </div>
    </Header>
  );
}
function AppMenu({ inline = false }): JSX.Element {
  const MenuItems = [
    { label: "Fleet", icon: <CarOutlined />, key: "feet", link: "/Fleet" },
    { label: "Vehicles", icon: <CarFilled />, key: "feet", link: "/AddVehcil" },
    { label: "Reporting", icon: <FileSearchOutlined />, key: "feet" },
    { label: "Configuration", icon: <SettingOutlined />, key: "feet" },
  ];
  return (
    <div>
      <Col>
        <Menu
          theme={inline ? "light" : "dark"}
          mode={inline ? "inline" : "horizontal"}
          defaultSelectedKeys={["1"]}
        >
          {MenuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.link}>
                {item.icon}
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
    </div>
  );
}

export default NavBar;
