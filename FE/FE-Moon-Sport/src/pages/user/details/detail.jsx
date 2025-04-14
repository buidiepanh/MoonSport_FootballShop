import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  addToCartFunction,
  getAllProducts,
} from "../../../services/apiServices";
import { Row, Col, Typography, Button, Spin, Divider, Tag, Result } from "antd";
import { ShoppingCartOutlined, FrownOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;

function Details() {
  const { productId } = useParams();
  const navigation = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const result = await getAllProducts();
        setProduct(result?.find((item) => item._id === productId));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <>
        <div style={{ textAlign: "center", padding: "80px" }}>
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div style={{ padding: "80px 24px", backgroundColor: "#fff" }}>
          <Result
            icon={<FrownOutlined style={{ fontSize: "64px", color: "#999" }} />}
            title="Product not found!"
            subTitle="Sorry, we couldn’t find the product you’re looking for."
            extra={
              <Button type="primary" href="/">
                Back to Shop
              </Button>
            }
          />
        </div>
      </>
    );
  }

  const handleAddToCart = async (productId) => {
    try {
      const result = await addToCartFunction(productId);

      if (!result) {
        toast.error("Cannot this product to your shopping cart!");
      } else {
        toast.success("Add to your shopping cart success!");
        navigation("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const discountedPrice = product.price * (1 - product.sale / 100);

  return (
    <>
      <div style={{ padding: "40px", backgroundColor: "#f5f5f5" }}>
        <Button
          onClick={() => navigation("/")}
          style={{
            marginBottom: "24px",
            backgroundColor: "#1890ff",
            color: "#fff",
            borderRadius: "8px",
          }}
        >
          ⬅️ Back to home
        </Button>
        <Row gutter={[40, 24]} justify="center" align="middle">
          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                padding: "12px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={2}>{product.name}</Title>
              <Text type="secondary">Category: {product.category?.name}</Text>
              <Divider />

              {product.sale > 0 ? (
                <div style={{ marginBottom: "12px" }}>
                  <Text delete style={{ color: "#888", fontSize: "16px" }}>
                    {product.price.toLocaleString()} VND
                  </Text>
                  <br />
                  <Text strong style={{ fontSize: "22px", color: "#e53935" }}>
                    {discountedPrice.toLocaleString()} VND
                  </Text>
                  <Tag color="red" style={{ marginLeft: "12px" }}>
                    -{product.sale}%
                  </Tag>
                </div>
              ) : (
                <Text strong style={{ fontSize: "22px", color: "#000" }}>
                  {product.price.toLocaleString()} VND
                </Text>
              )}

              <Divider />

              <Paragraph style={{ color: "#555" }}>
                <strong>Product Description:</strong> <br />
                {product?.description?.length > 0 ? (
                  <p>{product.description}</p>
                ) : (
                  <div>No description yet!</div>
                )}
              </Paragraph>

              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                style={{ marginTop: "16px", borderRadius: "8px" }}
                onClick={() => handleAddToCart(productId)}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Details;
