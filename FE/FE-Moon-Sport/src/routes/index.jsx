import { Route, Routes } from "react-router";
import Home from "../pages/user/home/home";
import Details from "../pages/user/details/detail";
import Category from "../pages/user/category/category";
import UserHeader from "../component/header/header";
import MoonSportFooter from "../component/footer/footer";
import Login from "../pages/authen/login/login";
import Admin from "../pages/admin/admin";
import Register from "../pages/authen/register/register";
import Cart from "../pages/user/shopping-cart/cart";

function UserRouter() {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<Details />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/carts" element={<Cart />} />
      </Routes>
      <MoonSportFooter />
    </>
  );
}

function AdminRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </>
  );
}

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin" element={<AdminRouter />} />
      </Routes>
    </>
  );
}
