import React, { use, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Select,
} from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import {
  addNewProducts,
  deleteProduct,
  deleteUser,
  getAllCategories,
  getAllProducts,
  getAllUsers,
  updateProduct,
  updateUser,
} from "../../services/apiServices";
import toast from "react-hot-toast";

const { Header, Content, Sider } = Layout;

function Admin() {
  const [selectedMenu, setSelectedMenu] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const isUserMode = selectedMenu === "users";
  const data = isUserMode ? users : products;
  const setData = isUserMode ? setUsers : setProducts;

  const showModal = (item = null) => {
    setEditingItem(item);

    form.setFieldsValue(
      item
        ? isUserMode
          ? { username: item.username, email: item.email }
          : {
              name: item.name,
              price: item.price,
              image: item.image,
              sale: item.sale,
              category: item.category?._id,
              description: item.description,
            }
        : isUserMode
        ? { username: "", email: "" }
        : {
            name: "",
            price: "",
            image: "",
            sale: "",
            category: "",
            description: "",
          }
    );

    setIsModalVisible(true);
  };

  const fetchUser = async () => {
    try {
      const result = await getAllUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      let values = await form.validateFields();

      if (editingItem) {
        let updateData;

        if (isUserMode) {
          updateData = await updateUser(
            editingItem?._id,
            values.username,
            values.email
          );
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === editingItem._id ? updateData : user
            )
          );
        } else {
          updateData = await updateProduct(editingItem._id, {
            name: values.name,
            price: values.price,
            image: values.image,
            sale: values.sale,
            category: values.category,
            description: values.description,
          });
          setProducts((prevProduct) =>
            prevProduct.map((product) =>
              product._id === editingItem._id ? updateData : product
            )
          );
        }

        if (!updateData) {
          toast.error(`Cannot update ${isUserMode ? "user" : "product"}!`);
        } else {
          toast.success(`${isUserMode ? "User" : "Product"} updated`);
        }
      } else {
        const result = await addNewProducts({
          name: values.name,
          price: values.price,
          image: values.image,
          sale: values?.sale || 0,
          category: values.category,
          description: values.description,
        });

        if (!result) {
          toast.error("Cannot add product!");
        } else {
          toast.success("Add new product success!");
          fetchProducts();
        }
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let response;
      if (isUserMode) {
        response = await deleteUser(id);
      } else {
        response = await deleteProduct(id);
      }

      if (!response) {
        toast.error(`Cannot delete ${isUserMode ? "user" : "product"}!`);
      }
      toast.success(`${isUserMode ? "User" : "Product"} deleted!`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const columns = isUserMode
    ? [
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
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
      ]
    : [
        {
          title: "Product Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
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
          title: "Sale",
          dataIndex: "sale",
          key: "sale",
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
          render: (category) => category?.name || "N/A",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          ellipsis: true,
        },
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
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#001529",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <h2 style={{ color: "#fff", margin: 0 }}>Admin Dashboard</h2>
        <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Layout>
        <Sider width={200} theme="dark">
          <Menu
            mode="inline"
            defaultSelectedKeys={["users"]}
            selectedKeys={[selectedMenu]}
            onClick={(e) => setSelectedMenu(e.key)}
            style={{ height: "100%" }}
          >
            <Menu.Item key="users" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <Menu.Item key="products" icon={<AppstoreOutlined />}>
              Products
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ padding: "32px 48px" }}>
          <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>
            {isUserMode ? "User Management" : "Product Management"}
          </h3>

          {!isUserMode && (
            <Button
              type="primary"
              onClick={() => showModal()}
              style={{ marginBottom: 24 }}
              size="large"
            >
              Add Product
            </Button>
          )}

          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            style={{ background: "#fff", padding: 24, borderRadius: 12 }}
          />

          <Modal
            title={editingItem ? "Edit" : "Add"}
            open={isModalVisible}
            onCancel={handleCancel}
            onOk={handleSave}
            okText="Save"
            bodyStyle={{ padding: "24px 24px" }}
          >
            <Form
              form={form}
              layout="vertical"
              style={{ gap: 20, display: "flex", flexDirection: "column" }}
            >
              <Form.Item
                name={isUserMode ? "username" : "name"}
                label={isUserMode ? "User Name" : "Product Name"}
                rules={[{ required: true, message: "Please enter a name!" }]}
              >
                <Input size="large" />
              </Form.Item>

              {isUserMode ? (
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
              ) : (
                <>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                      { required: true, message: "Please enter a price!" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    name="image"
                    label="Image URL"
                    rules={[
                      { required: true, message: "Please enter an image URL!" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item name="sale" label="Sale">
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select
                      placeholder="Select a category"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option?.children
                          ?.toLowerCase()
                          .includes(input.toLowerCase())
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
                    rules={[
                      {
                        required: true,
                        message: "Please enter a description!",
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} size="large" />
                  </Form.Item>
                </>
              )}
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
