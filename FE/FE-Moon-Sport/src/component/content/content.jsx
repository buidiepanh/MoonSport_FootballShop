import React, { useEffect, useState } from "react";
import { Carousel, Card, Row, Col, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import slideShow1 from "../../assets/banner/slideshow_1.jpg";
import slideShow2 from "../../assets/banner/slideshow_2.jpg";
import slideShow3 from "../../assets/banner/slideshow_3.jpg";
import slideShow4 from "../../assets/banner/slideshow_4.jpg";
import slideShow6 from "../../assets/banner/slideshow_6.jpg";
import slideShow7 from "../../assets/banner/slideshow_7.jpg";
import slideShow8 from "../../assets/banner/slideshow_8.jpg";
import slideShow9 from "../../assets/banner/slideshow_9.jpg";
import { getAllProducts } from "../../services/apiServices";
import { useNavigate } from "react-router";

const { Title } = Typography;
const { Meta } = Card;

const carouselImages = [
  slideShow1,
  slideShow2,
  slideShow3,
  slideShow4,
  slideShow6,
  slideShow7,
  slideShow8,
  slideShow9,
];

function Content() {
  const navigation = useNavigate();
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const result = await getAllProducts();
        const shuffled = result?.sort(() => 0.5 - Math.random());
        const selected = shuffled?.slice(0, 4);
        setHotProducts(selected);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsList();
  }, []);

  return (
    <div style={{ padding: "24px", backgroundColor: "#f9f9f9" }}>
      <Carousel autoplay autoplaySpeed={2000} style={{ marginBottom: "40px" }}>
        {carouselImages.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`banner-${index}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </Carousel>

      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        🔥 Hot Products
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {hotProducts?.map((product) => (
          <Col key={product?._id} xs={24} sm={12} md={8} lg={6}>
            <div style={{ position: "relative" }}>
              {product?.sale > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#e53935",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontWeight: 600,
                    fontSize: "12px",
                    zIndex: 1,
                  }}
                >
                  SALE {product.sale}%
                </div>
              )}

              <Card
                hoverable
                onClick={() => navigation(`/products/${product._id}`)}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                cover={
                  <img
                    alt={product?.name}
                    src={product?.image}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                }
                actions={[
                  <ShoppingCartOutlined
                    key="buy"
                    style={{ fontSize: "20px" }}
                  />,
                ]}
              >
                <Meta
                  title={
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#222",
                      }}
                    >
                      {product?.name}
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ color: "#888", marginBottom: 4 }}>
                        {product?.category?.name}
                      </div>
                      {product?.sale > 0 ? (
                        <div>
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#aaa",
                              marginRight: 8,
                            }}
                          >
                            {product?.price.toLocaleString()} VND
                          </span>
                          <span style={{ color: "#e53935", fontWeight: 600 }}>
                            {(
                              product?.price *
                              (1 - product?.sale / 100)
                            ).toLocaleString()}{" "}
                            VND
                          </span>
                        </div>
                      ) : (
                        <div style={{ color: "#000", fontWeight: 600 }}>
                          {product?.price.toLocaleString()} VND
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Content;
