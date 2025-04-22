import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/apiServices";
import { Row, Col, Card, Tag, Typography, Badge, Radio, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Meta } = Card;
const { Title } = Typography;

const priceRanges = [
  { label: "Under 500K", value: "under500", check: (price) => price < 500000 },
  {
    label: "Under 1 million",
    value: "under1m",
    check: (price) => price < 1000000,
  },
  {
    label: "Under 2 million",
    value: "under2m",
    check: (price) => price < 2000000,
  },
  {
    label: "Above 2 million",
    value: "above2m",
    check: (price) => price >= 2000000,
  },
];

function Sale() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const navigation = useNavigate();

  const fetchSaleProducts = async () => {
    try {
      const result = await getAllProducts();
      const filtered = result?.filter((product) => product.sale > 0);
      setSaleProducts(filtered);
      setFilteredProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSaleProducts();
  }, []);

  useEffect(() => {
    if (selectedRanges.length === 0) {
      setFilteredProducts(saleProducts);
    } else {
      const matched = saleProducts.filter((product) => {
        const discountedPrice = product.price * ((100 - product.sale) / 100);
        return selectedRanges.some((key) => {
          const range = priceRanges.find((r) => r.value === key);
          return range?.check(discountedPrice);
        });
      });
      setFilteredProducts(matched);
    }
  }, [selectedRanges, saleProducts]);

  return (
    <div style={{ padding: "30px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        🎉 Super Sale - Hot Deals Just For You! 🔥
      </Title>

      <Row gutter={24}>
        <Col xs={24} sm={6} md={5} lg={4}>
          <div
            style={{
              border: "1px solid #f0f0f0",
              padding: "16px",
              borderRadius: 8,
            }}
          >
            <Title level={4}>Filter by Price</Title>
            <Radio.Group
              onChange={(e) => setSelectedRanges([e.target.value])}
              value={selectedRanges[0] || null}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {priceRanges.map((range) => (
                <Radio key={range.value} value={range.value}>
                  {range.label}
                </Radio>
              ))}
            </Radio.Group>

            <Divider />
          </div>
        </Col>

        <Col xs={24} sm={18} md={19} lg={20}>
          <Row gutter={[24, 24]} justify="start">
            {filteredProducts.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <Badge.Ribbon
                  text={`-${product.sale}%`}
                  color="red"
                  placement="start"
                >
                  <Card
                    hoverable
                    onClick={() => navigation(`/products/${product._id}`)}
                    cover={
                      <img
                        alt={product.name}
                        src={product.image}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    }
                    actions={[<ShoppingCartOutlined key="cart" />]}
                  >
                    <Meta
                      title={product.name}
                      description={
                        <div>
                          <div style={{ fontWeight: "bold", color: "#fa541c" }}>
                            {(
                              product.price *
                              ((100 - product.sale) / 100)
                            ).toLocaleString()}{" "}
                            VND
                          </div>
                          <div
                            style={{
                              textDecoration: "line-through",
                              color: "#aaa",
                            }}
                          >
                            {product.price.toLocaleString()} VND
                          </div>
                          <Tag color="green" style={{ marginTop: 8 }}>
                            On Sale
                          </Tag>
                        </div>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>

          {filteredProducts.length === 0 && (
            <Title level={4} style={{ textAlign: "center", marginTop: 50 }}>
              No discounted products match your filter.
            </Title>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Sale;
