import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Badge,
  Dropdown,
  Typography,
  Space,
  Button,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  getAllCartItem,
  getAllCategories,
  getAllUsers,
  getAuthenticatedUser,
} from "../../services/apiServices";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const { Header } = Layout;
const { Text } = Typography;

function HeaderComp() {
  const navigation = useNavigate();
  const [categories, setCategories] = useState([]);
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [numberItem, setNumberItem] = useState(0);

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigation("profile");
    } else if (e.key === "2") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logout success!");
    navigation("/login");
  };

  const userMenu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "1",
          icon: <ProfileOutlined />,
          label: "Profile",
        },
        {
          key: "2",
          icon: <LogoutOutlined />,
          label: "Logout",
        },
      ]}
    />
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const result = await getAllCartItem();
        setNumberItem(result?.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItem();
  }, []);

  useEffect(() => {
    const fetchAuthenticatedUer = async () => {
      try {
        const result = await getAuthenticatedUser();
        setUser(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthenticatedUer();
  }, [token]);

  const categoryMenu = (
    <Menu>
      {categories?.map((cat) => (
        <Menu.Item
          key={cat._id}
          onClick={() => navigation(`/category/${cat.name}`)}
        >
          {cat.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px #f0f1f2",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Text
        strong
        style={{ fontSize: 20, color: "#111", cursor: "pointer" }}
        onClick={() => navigation("/")}
      >
        🌓 MOON SPORT
      </Text>

      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Menu.Item key="home" onClick={() => navigation("/")}>
          Home
        </Menu.Item>
        <Dropdown overlay={categoryMenu} trigger={["click"]}>
          <Menu.Item key="category">Category</Menu.Item>
        </Dropdown>
        <Menu.Item key="sale">Sale</Menu.Item>
        <Menu.Item key="about">About Us</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
      </Menu>

      <Space size="large">
        <Badge
          count={numberItem}
          offset={[0, 0]}
          onClick={() => {
            !sessionStorage.getItem("token")
              ? navigation("/login")
              : navigation("/carts");
          }}
        >
          <ShoppingCartOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </Badge>

        {!token ? (
          <>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigation("/login")}
              size="middle"
              style={{
                background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "0 20px",
                height: "38px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #1565c0, #1e88e5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #1e88e5, #42a5f5)";
              }}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <Text>Welcome, {user?.username} </Text>
              </Space>
            </Dropdown>
          </>
        )}
      </Space>
    </Header>
  );
}

export default HeaderComp;
