import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { getAllOrders, updateOrderStatus } from "../../../services/apiServices";
import Item from "antd/es/list/Item";
import dayjs from "dayjs";
import toast from "react-hot-toast";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const orderData = orders?.map((order) => ({
    _id: order._id,
    itemName: order.products[0]?.name || "N/A",
    quantity: order.quantity,
    price: order.products[0]?.price || 0,
    customer: order.customer?.username || "Unknown",
    status: order.status,
    createdAt: order.createdAt,
  }));

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const result = await getAllOrders();
      setOrders(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (record) => {
    try {
      const result = await updateOrderStatus(record._id);
      if (result) {
        toast.success("Update Order status success!");
        fetchAllOrders();
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
      dataIndex: "itemName",
      key: "itemName",
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
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Date",
      key: "createdAt",
      render: (_, record) => dayjs(record.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          style={{
            color:
              text === "APPROVED"
                ? "green"
                : text === "CANCELLED"
                ? "red"
                : "orange",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "PENDING" ? (
          <Space>
            <Button type="primary" onClick={() => handleApprove(record)}>
              Approve
            </Button>
          </Space>
        ) : null,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Order Management</h2>
      <Table
        dataSource={orderData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default OrderManagement;
