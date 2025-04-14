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
