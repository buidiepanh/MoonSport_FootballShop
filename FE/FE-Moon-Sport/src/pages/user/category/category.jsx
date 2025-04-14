import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../services/apiServices";
import { Row, Col, Card, Typography, Tag, Result, Button, Input } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

function Category() {
  const { categoryName } = useParams();
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await getAllCategories();
        const selectedCate = result.find((item) => item.name === categoryName);
        if (selectedCate) {
          setProductList(selectedCate.products);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [categoryName]);

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (productList.length === 0) {
    return (
      <div style={{ padding: "80px 24px", backgroundColor: "#fff" }}>
        <Result
          icon={<FrownOutlined style={{ fontSize: "64px", color: "#999" }} />}
          title="No Product!"
          subTitle="Sorry, This category doesn't have any products."
          extra={
            <Button type="primary" href="/">
              Back to Shop
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        {categoryName} Products
      </Title>

      <div style={{ maxWidth: 400, margin: "0 auto 40px" }}>
        <Search
          placeholder="Search products..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Row gutter={[24, 24]}>
        {filteredProducts.map((product) => {
          const discountedPrice = product.price * (1 - product.sale / 100);

          return (
            <Col key={product._id} xs={24} sm={12} md={8}>
              <div style={{ height: "100%" }}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: "250px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#f9f9f9",
                      }}
                    >
                      <img
                        alt={product.name}
                        src={product.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  }
                  onClick={() => navigate(`/products/${product._id}`)}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s",
                  }}
                  bodyStyle={{ minHeight: "140px", padding: "16px" }}
                >
                  <div>
                    <Title level={4} ellipsis style={{ marginBottom: 8 }}>
                      {product.name}
                    </Title>

                    {product.sale > 0 ? (
                      <>
                        <Text
                          delete
                          style={{ color: "#888", fontSize: "14px" }}
                        >
                          {product.price.toLocaleString()} VND
                        </Text>
                        <br />
                        <Text
                          strong
                          style={{ fontSize: "18px", color: "#e53935" }}
                        >
                          {discountedPrice.toLocaleString()} VND
                        </Text>
                        <Tag color="red" style={{ marginLeft: "12px" }}>
                          -{product.sale}%
                        </Tag>
                      </>
                    ) : (
                      <Text strong style={{ fontSize: "18px", color: "#000" }}>
                        {product.price.toLocaleString()} VND
                      </Text>
                    )}
                  </div>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Category;
