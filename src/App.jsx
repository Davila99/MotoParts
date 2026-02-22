import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Common/Footer";
import ScrollToTop from "./Components/Common/ScrollToTop";
import Navbar from "./Components/Common/Navbar";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import StoreLayout from "./store/StoreLayout";
import Dashboard from "./store/Dashboard";
import StoreAddProduct from "./store/StoreAddProduct";
import StoreManageProducts from "./store/StoreManageProducts";
import StoreOrders from "./store/StoreOrders";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";


function AppContent() {
  const location = useLocation();
  const hiddenLayoutRoutes = ["/store"];
  const isStoreRoute = hiddenLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );


  return (
    <>
      {/* Oculta Navbar en rutas del store */}
     {!isStoreRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders/>} />
         <Route path="/login" element={<Login/>} />

        {/* Rutas del store (dashboard, etc.) */}
        <Route path="/store" element={<StoreLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<StoreAddProduct />} />
          <Route path="manage-product" element={<StoreManageProducts />} />
          <Route path="orders" element={<StoreOrders/>} />
        </Route>
      </Routes>

      {/* Oculta Footer en rutas del store */}
       {!isStoreRoute && <Footer />}

    </>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
