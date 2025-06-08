import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import UserManagement from "./user-management/userManagement";
import ProductManagement from "./product-management/productManagement";
import OrderManagement from "./order-management/orderManagement";

const { Header, Content, Sider } = Layout;

function Admin() {
  const [selectedMenu, setSelectedMenu] = useState("users");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "users":
        return <UserManagement />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#001529",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <h2 style={{ color: "#fff", margin: 0 }}>Admin Dashboard</h2>
        <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Layout>
        <Sider width={200} theme="dark">
          <Menu
            mode="inline"
            defaultSelectedKeys={["users"]}
            selectedKeys={[selectedMenu]}
            onClick={(e) => setSelectedMenu(e.key)}
            style={{ height: "100%" }}
          >
            <Menu.Item key="users" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <Menu.Item key="products" icon={<AppstoreOutlined />}>
              Products
            </Menu.Item>
            <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
              Orders
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ padding: "32px 48px" }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
