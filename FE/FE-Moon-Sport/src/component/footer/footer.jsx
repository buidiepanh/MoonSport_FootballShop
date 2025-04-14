import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

function MoonSportFooter() {
  return (
    <Footer
      style={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        padding: "40px 60px",
      }}
    >
      <Row gutter={[32, 32]}>
        {/* Logo + Slogan */}
        <Col xs={24} md={8}>
          <Title level={3} style={{ color: "#111" }}>
            🌓 Moon Sport
          </Title>
          <Text style={{ color: "#555" }}>
            Step into comfort and performance. Discover your perfect pair today.
          </Text>
        </Col>

        {/* Navigation Links */}
        <Col xs={24} md={8}>
          <Title level={5} style={{ color: "#111" }}>
            Quick Links
          </Title>
          <Space direction="vertical" size="small">
            <Link href="#" style={{ color: "#555" }}>
              About Us
            </Link>
            <Link href="#" style={{ color: "#555" }}>
              Shop
            </Link>
            <Link href="#" style={{ color: "#555" }}>
              FAQs
            </Link>
            <Link href="#" style={{ color: "#555" }}>
              Contact
            </Link>
          </Space>
        </Col>

        {/* Contact Info + Socials */}
        <Col xs={24} md={8}>
          <Title level={5} style={{ color: "#111" }}>
            Contact
          </Title>
          <Space direction="vertical" size="small">
            <Text style={{ color: "#555" }}>
              <EnvironmentOutlined /> 123 Sport St, HCMC, Vietnam
            </Text>
            <Text style={{ color: "#555" }}>
              <PhoneOutlined /> +84 987 654 321
            </Text>
            <Text style={{ color: "#555" }}>
              <MailOutlined /> support@moonsport.com
            </Text>
          </Space>
          <div style={{ marginTop: 16 }}>
            <Space size="large">
              <FacebookFilled style={{ fontSize: 20, color: "#3b5998" }} />
              <InstagramOutlined style={{ fontSize: 20, color: "#E1306C" }} />
              <TwitterOutlined style={{ fontSize: 20, color: "#1DA1F2" }} />
            </Space>
          </div>
        </Col>
      </Row>

      <div
        style={{
          borderTop: "1px solid #ddd",
          marginTop: 40,
          paddingTop: 16,
          textAlign: "center",
        }}
      >
        <Text style={{ color: "#777" }}>
          © {new Date().getFullYear()} Moon Sport. All rights reserved.
        </Text>
      </div>
    </Footer>
  );
}

export default MoonSportFooter;
