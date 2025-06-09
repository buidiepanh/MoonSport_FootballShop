import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";

import toast from "react-hot-toast";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../../services/apiServices";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const result = await getAllUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (item = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || { username: "", email: "" });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      let values = await form.validateFields();

      const updatedUser = await updateUser(
        editingItem._id,
        values.username,
        values.email
      );
      if (!updatedUser) {
        toast.error("Cannot update user!");
      } else {
        toast.success("User updated!");
        setUsers((prev) =>
          prev.map((u) => (u._id === editingItem._id ? updatedUser : u))
        );
        handleCancel();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteUser(id);
    if (!response) toast.error("Cannot delete user!");
    else {
      toast.success("User deleted!");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3 style={{ fontSize: 24, marginBottom: 24 }}>User Management</h3>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        style={{ background: "#fff", padding: 24, borderRadius: 12 }}
      />

      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ gap: 20, display: "flex", flexDirection: "column" }}
        >
          <Form.Item
            name="username"
            label="User Name"
            rules={[{ required: true, message: "Please enter a name!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter an email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserManagement;
