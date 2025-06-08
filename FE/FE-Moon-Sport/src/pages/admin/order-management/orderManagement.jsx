import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { getAllOrders } from "../../../services/apiServices";
import Item from "antd/es/list/Item";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const orderData = orders?.map((order) => ({
    _id: order._id,
    itemName: order.products[0]?.name || "N/A",
    quantity: order.quantity,
    price: order.products[0]?.price || 0,
    customer: order.customer?.username || "Unknown",
  }));

  useEffect(() => {
    fetchAllOrders();
  }, []);

  console.log(orders);

  const fetchAllOrders = async () => {
    try {
      const result = await getAllOrders();
      setOrders(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = (record) => {
    message.success(`Order ${record.id} approved!`);
    // You can call your backend API here
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
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleApprove(record)}>
            Approve
          </Button>
        </Space>
      ),
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
