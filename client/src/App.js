import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/pages/auth/signin";
import SignUp from "./components/pages/auth/signup";
import Products from "./components/pages/products";
import ProductDetails from "./components/pages/productDetails";
import Profile from "./components/pages/profile";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Basket from "./components/pages/basket/Basket";
import Error404 from "./components/pages/error404/Error404";
import Admin from "./components/pages/admin";
import ProtectedRouteAdmin from "./components/pages/admin/ProtectedRoute";
import AdminHome from "./components/pages/admin/admin home";
import AdminProducts from "./components/pages/admin/admin products";
import AdminOrders from "./components/pages/admin/admin orders";
import ProductDetail from "./components/pages/admin/productDetail";
import NewProduct from "./components/pages/admin/admin products/New";
function App() {
  return (
    <div className="content">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/signin" exact element={<SignIn></SignIn>}></Route>
          <Route path="/signup" exact element={<SignUp></SignUp>}></Route>
          <Route
            path="product/:product_id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/" exact element={<Products></Products>}></Route>
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/profile" exact element={<Profile></Profile>}></Route>
          </Route>
          <Route element={<ProtectedRouteAdmin></ProtectedRouteAdmin>}>
            <Route path="/admin" exact element={<Admin></Admin>}>
              <Route path="/admin" exact element={<AdminHome></AdminHome>} />
              <Route path="products" exact element={<AdminProducts></AdminProducts>} />
              <Route path="orders" exact element={<AdminOrders></AdminOrders>} />
              <Route path="products/:product_id" element={<ProductDetail></ProductDetail>}></Route>
              <Route path="products/new" exact element={<NewProduct></NewProduct>}></Route>
            </Route>
          </Route>
          <Route path="/basket" element={<Basket></Basket>}></Route>
          <Route path="*" element={<Error404></Error404>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
