const Categories = require("../models/category");
const Products = require("../models/product");
const Users = require("../models/user");
const Carts = require("../models/cart");

//====================Category CRUD==================
const getAllCategory = async (req, res, next) => {
  try {
    const result = await Categories.find({}).populate("products");

    if (!result) {
      res.status(404).json("No category found!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const postNewCategory = async (req, res, next) => {
  try {
    const result = await Categories.create(req.body);

    if (!result) {
      res.status(400).json("Cannot add category!");
      return null;
    }

    res.status(200).json("Add category success!");
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const result = await Categories.findByIdAndUpdate(
      req.params.categoryId,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update category!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//====================Product CRUD===================
const getAllProducts = async (req, res, next) => {
  try {
    const result = await Products.find({}).populate("category", "name");

    if (!result) {
      res.status(404).json("No products found!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const postNewProduct = async (req, res, next) => {
  try {
    const result = await Products.create(req.body);
    const categoryId = req.body.category;

    if (!result) {
      res.status(400).json("Cannot add product!");
      return null;
    }

    await Categories.findByIdAndUpdate(categoryId, {
      $push: { products: result._id },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const result = await Products.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update product!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const response = await Products.findByIdAndDelete(req.params.productId);

    if (!response) {
      res.status(400).json("Cannot delete product!");
      return null;
    }

    res.status(200).json("Delete product success!");
  } catch (error) {
    next(error);
  }
};

//====================User CRUD======================
const getAllUsers = async (req, res, next) => {
  try {
    const result = await Users.find({});

    if (!result) {
      res.status(404).json("User not found!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAuthenitcatedUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      res.status(404).json("User not found!");
      return null;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await Users.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update user!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const response = await Users.findByIdAndDelete(req.params.userId);

    if (!response) {
      res.status(400).json("Cannot delete user");
      return null;
    }

    res.status(200).json("Delete user success!");
  } catch (error) {
    next(error);
  }
};

//=================Cart CRUD============================
const viewAllCart = async (req, res, next) => {
  try {
    const result = await Carts.find({ user: req.user._id })
      .populate("product")
      .populate("user", "_id username");

    if (!result) {
      res.status(404).json("No cart found!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewCart = async (req, res, next) => {
  try {
    const { product, quantity, user } = req.body;
    const existingCartItem = await Carts.findOne({
      product: product,
      user: req.user._id,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json("Updated quantity in cart!");
    } else {
      const result = await Carts.create({
        user: req.user._id,
        product: product,
        quantity: quantity,
      });

      if (!result) {
        res.status(400).json("Cannot add new cart!");
        return null;
      }

      res.status(200).json("Add new cart success!");
    }
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const result = await Carts.findByIdAndUpdate(
      req.params.cartId,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update cart item!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const response = await Carts.findByIdAndDelete(req.params.cartId);

    if (!response) {
      res.status(400).json("Cannot delete this item!");
      return null;
    }

    res.status(200).json("Delete success!");
    return response;
  } catch (error) {
    next(error);
  }
};

const deleteAllCartItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const response = await Carts.deleteMany({ user: userId });

    if (!response) {
      res.status(400).json("Cannot delete items!");
      return null;
    }

    res.status(200).json("Delete all item success!");
    return response;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  postNewCategory,
  updateCategory,

  getAllProducts,
  postNewProduct,
  updateProduct,
  deleteProduct,

  getAllUsers,
  getAuthenitcatedUser,
  updateUser,
  deleteUser,

  viewAllCart,
  addNewCart,
  updateCartItem,
  deleteCartItem,
  deleteAllCartItem,
};
