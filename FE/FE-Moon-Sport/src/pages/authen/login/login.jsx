import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/authen_image/authen.jpg";
import {
  getAuthenticatedUser,
  loginFunction,
} from "../../../services/apiServices";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const result = await loginFunction(values.email, values.password);

      if (result) {
        toast.success("Login success!");
        sessionStorage.setItem("token", result.accessToken);

        const user = await getAuthenticatedUser();
        sessionStorage.setItem("admin", user?.admin);
        if (user.admin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover    ",
          backgroundPosition: "center",
        }}
      />

      {/* Form bên phải */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          backgroundColor: "#fff",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Title level={3}>Welcome Back 👋</Title>
            <Text type="secondary">Please log in to continue</Text>
          </div>

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Email is not valid" },
              ]}
            >
              <Input size="large" placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ marginTop: 12 }}
              >
                Login
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
              <Text type="secondary">Don't have an account?</Text>
              <Button
                type="link"
                onClick={() => navigate("/register")}
                style={{ padding: 0, marginLeft: 6 }}
              >
                Register now
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
