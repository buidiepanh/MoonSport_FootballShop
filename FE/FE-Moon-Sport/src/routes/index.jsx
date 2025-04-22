import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/user/home/home";
import Details from "../pages/user/details/detail";
import Category from "../pages/user/category/category";
import UserHeader from "../component/header/header";
import MoonSportFooter from "../component/footer/footer";
import Login from "../pages/authen/login/login";
import Admin from "../pages/admin/admin";
import Register from "../pages/authen/register/register";
import Cart from "../pages/user/shopping-cart/cart";
import PaymentResult from "../pages/user/payment/paymentCallback";
import toast from "react-hot-toast";
import About from "../pages/user/about-us/about";
import Sale from "../pages/user/sale/sale";

const AuthMiddleWare = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const roleAdmin = sessionStorage.getItem("admin") === "true";

  if (!token) {
    toast.error("Please log in!");
    return <Navigate to="/login" replace />;
  }

  if (!roleAdmin) {
    toast.error("Access denied!");
    return <Navigate to="/" replace />;
  }

  return children;
};

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
        <Route path="/about-us" element={<About />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/orders/vnpay-return" element={<PaymentResult />} />
        <Route path="/sale" element={<Sale />} />
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
        <Route
          path="/admin"
          element={
            <AuthMiddleWare>
              <AdminRouter />
            </AuthMiddleWare>
          }
        />
      </Routes>
    </>
  );
}
