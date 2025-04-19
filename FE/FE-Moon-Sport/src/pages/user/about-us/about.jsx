import React from "react";
import { Typography, Row, Col, Card, Divider } from "antd";
import {
  TeamOutlined,
  ShoppingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Row justify="center" style={{ marginBottom: 40 }}>
        <Col span={20}>
          <Title level={2} style={{ textAlign: "center" }}>
            About Moon Sport
          </Title>
          <Paragraph
            style={{
              fontSize: 16,
              textAlign: "center",
              maxWidth: 800,
              margin: "auto",
            }}
          >
            Moon Sport is a specialized football shoe store offering top-quality
            futsal and outdoor cleats. We are committed to delivering only
            authentic products from globally trusted brands, tailored for both
            training and competitive play.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <img
                alt="Genuine Products"
                src="https://file.hstatic.net/200000278317/file/bai-viet-gioi-thieu-thanh-hung-futsal-4_6e42ceb2b81e493d8816591fef362a85.jpg"
                style={{ height: 200, objectFit: "fill" }}
              />
            }
          >
            <Card.Meta
              avatar={
                <ShoppingOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              }
              title="100% Authentic Products"
              description="We only sell genuine products from Adidas, Nike, Joma, Mizuno, and more – all with official tags and documentation."
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <img
                alt="Professional Team"
                src="https://file.hstatic.net/200000278317/file/bai-viet-gioi-thieu-thanh-hung-futsal-5_520342acf9984398b8cc6f8aa3caca7d.jpg"
                style={{ height: 200, objectFit: "cover" }}
              />
            }
          >
            <Card.Meta
              avatar={
                <TeamOutlined style={{ fontSize: 24, color: "#52c41a" }} />
              }
              title="Passionate Team"
              description="Our staff are football lovers who understand your needs and are ready to help you choose the perfect pair of shoes."
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <img
                alt="Happy Customers"
                src="https://file.hstatic.net/200000278317/file/customer_bec20db7fa9e46758dc06905c16f990e.jpg"
                style={{ height: 200, objectFit: "cover" }}
              />
            }
          >
            <Card.Meta
              avatar={
                <SmileOutlined style={{ fontSize: 24, color: "#fadb14" }} />
              }
              title="10,000+ Happy Customers"
              description="Your satisfaction is our success. We pride ourselves on excellent service and long-lasting customer relationships."
            />
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: "60px 0" }} />

      <Row justify="center">
        <Col span={20}>
          <Title level={3}>Our Mission</Title>
          <Paragraph style={{ fontSize: 16 }}>
            We don’t just sell shoes – we inspire your football journey. Moon
            Sport is here to support your performance, growth, and love for the
            game with every step you take on the pitch.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default About;
