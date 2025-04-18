import axios from "../util/axios.customize";

export const registerFunction = async (username, email, password) => {
  try {
    const result = await axios.post("/authen/register", {
      username,
      email,
      password,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginFunction = async (email, password) => {
  try {
    const result = await axios.post("/authen/login", { email, password });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const result = await axios.get("/users/authenticated-user");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const result = await axios.get("/products");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const result = await axios.get("/categories");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartItem = async () => {
  try {
    const result = await axios.get("/carts");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToCartFunction = async (productId) => {
  try {
    const result = await axios.post("/carts", {
      product: productId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem = async (cartId, number) => {
  try {
    const result = await axios.put(`/carts/${cartId}`, { quantity: number });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cartId) => {
  try {
    const result = await axios.delete(`/carts/${cartId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllCartItem = async () => {
  try {
    const result = await axios.delete("/carts");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const paymentItem = async (money) => {
  try {
    const result = await axios.post("/orders/create-payment", {
      amount: money,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const paymentCallback = async (url) => {
  try {
    const result = await axios.get(`/orders/vnpay-return${url}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//=============Admin API=================

export const getAllUsers = async () => {
  try {
    const result = await axios.get("/users");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userId, name, email) => {
  try {
    const result = await axios.put(`/users/${userId}`, {
      username: name,
      email: email,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const result = await axios.delete(`/users/${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewProducts = async (data) => {
  try {
    const result = await axios.post("/products", data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId, newData) => {
  try {
    const result = await axios.put(`/products/${productId}`, newData);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const result = await axios.delete(`/products/${productId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
