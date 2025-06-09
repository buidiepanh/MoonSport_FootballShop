import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { getAllOrders, updateOrderStatus } from "../../../services/apiServices";
import toast from "react-hot-toast";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAuthenticatedOrder();
  }, []);

  const fetchAuthenticatedOrder = async () => {
    try {
      const userId = sessionStorage.getItem("id");
      const result = await getAllOrders();

      setOrders(result.filter((item) => item.customer._id === userId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (record) => {
    try {
      const result = await updateOrderStatus(record._id);
      if (result) {
        toast.success("Update Order status success!");
        fetchAuthenticatedOrder();
      } else {
        toast.error("Update Order status failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "APPROVED"
            ? "green"
            : status === "CANCELLED"
            ? "red"
            : "orange";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "PENDING" ? (
          <Popconfirm
            title="Are you sure you want to cancel this order?"
            onConfirm={() => handleCancel(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Cancel</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const dataSource = orders.map((order) => ({
    ...order,
    productName: order.products[0]?.name || "N/A",
    price: order.products[0]?.price || 0,
  }));

  return (
    <div style={{ padding: 24 }}>
      <h2>Your Orders</h2>
      <Table dataSource={dataSource} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Order;
