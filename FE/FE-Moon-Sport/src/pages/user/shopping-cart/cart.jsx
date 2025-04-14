import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  InputNumber,
  Image,
  Typography,
  Popconfirm,
  message,
} from "antd";
import {
  deleteCartItem,
  getAllCartItem,
  updateCartItem,
} from "../../../services/apiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const { Title } = Typography;

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const result = await getAllCartItem();
        setCartItems(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  const handleDeleteCartItem = async (cartId) => {
    try {
      const result = await deleteCartItem(cartId);

      if (!result) {
        toast.error("Cannot delete this cart item!");
      } else {
        toast.success("Delete cart item success!");
        setCartItems((prev) => prev.filter((item) => item._id !== cartId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCartItem = async (cartId, number) => {
    try {
      const result = await updateCartItem(cartId, number);

      if (!result) {
        toast.error("Cannot change item quantity!");
      } else {
        toast.success("Update product quantity success!");
        setCartItems(cartItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: ["product", "image"],
      key: "image",
      render: (img) => <Image width={60} src={img} />,
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Price",
      dataIndex: ["product", "price"],
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(values) => handleUpdateCartItem(record._id, values)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) =>
        `${(record.quantity * record.product.price).toLocaleString(
          "vi-VN"
        )} VND`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDeleteCartItem(record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Shopping Cart</Title>
      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Title level={4}>Total: {totalPrice.toLocaleString("vi-VN")} VND</Title>
        <Button type="primary" size="large">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;

//test github
