import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import toast from "react-hot-toast";
import {
  addNewProducts,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  updateProduct,
} from "../../../services/apiServices";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (item = null) => {
    setEditingItem(item);
    form.setFieldsValue(
      item
        ? {
            name: item.name,
            price: item.price,
            image: item.image,
            sale: item.sale,
            category: item.category?._id,
            description: item.description,
          }
        : {
            name: "",
            price: 0,
            image: "",
            sale: "",
            category: undefined,
            description: "",
          }
    );

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingItem) {
        const updated = await updateProduct(editingItem._id, values);
        if (!updated) {
          toast.error("Cannot update product!");
        } else {
          toast.success("Product updated!");
          setProducts((prev) =>
            prev.map((p) => (p._id === editingItem._id ? updated : p))
          );
        }
      } else {
        const created = await addNewProducts({
          name: values.name,
          price: values.price,
          image: values.image,
          sale: values?.sale || 0,
          category: values.category,
          description: values.description,
        });

        console.log("created: ", created);

        if (!created) {
          toast.error("Cannot create product!");
        } else {
          toast.success("Product created!");
          fetchProduct();
        }
      }

      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteProduct(id);
    if (response) {
      toast.success("Delete product success!");
      fetchProduct();
    } else {
      toast.error("Cannot delete product!");
    }
  };

  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="product"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ),
    },
    {
      title: "Discount(%)",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name || "N/A",
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this product?"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h3 style={{ fontSize: 24 }}>Product Management</h3>
        <Button type="primary" onClick={() => showModal()}>
          Add Product
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        style={{ background: "#fff", padding: 24, borderRadius: 12 }}
      />

      <Modal
        title={editingItem ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter product price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} size="large" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter an image URL!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item name="sale" label="Sale">
            <InputNumber min={0} style={{ width: "100%" }} size="large" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {categories?.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea rows={4} size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ProductManagement;
