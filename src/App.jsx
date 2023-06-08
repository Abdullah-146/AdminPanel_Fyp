import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ChangePass from "./pages/ChangePass";
import Product from "./pages/Product";
import ManualOrder from "./pages/ManualOrder";
import Loan from "./pages/Loan";
import LoanRequest from "./pages/LoanRequest";
import Invoice from "./pages/Invoice";
import CRUD from "./pages/CRUD";
import UpdateProduct from "./pages/UpdateProduct";
import CreateQr from "./pages/CreateQr";
import Products from "./pages/Products";
import Tables from "./pages/Tables";
import CreateProduct from "./pages/CreateProduct";
import Notification from "./pages/Notifications";
import { io } from "socket.io-client";
import Category from "./pages/Category";
import Discount from "./pages/Discount";
import OrderDetails from "./pages/OrderDetails";
import Deals from "./pages/Deals";
import Deal from "./pages/Deal";
import CreateDeal from "./pages/CreateDeal";
import EditDeal from "./pages/EditDeal";
import EditProduct from "./pages/editProduct";

export const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("accessToken"),
  },
});

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/CreateQr" element={<CreateQr />} />
      <Route path="/order" element={<ManualOrder />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/createDeal" element={<CreateDeal />} />
      <Route path="/editDeal/:dealId" element={<EditDeal />} />
      <Route path="/deal/:dealId" element={<Deal />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-product" element={<UpdateProduct />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/editProduct/:id" element={<EditProduct />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/loanRequest" element={<LoanRequest />} />
      <Route path="/crud" element={<CRUD />} />
      <Route path="/login" element={<Login />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/users" element={<Users />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Discount" element={<Discount />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/Tables" element={<Tables />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/Notification" element={<Notification />} />
      <Route path="/OrderDetails/:id" element={<OrderDetails />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
