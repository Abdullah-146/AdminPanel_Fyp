import React from "react";
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
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/CreateQr" element={<CreateQr />} />
      <Route path="/order" element={<ManualOrder />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-product" element={<UpdateProduct />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/loanRequest" element={<LoanRequest />} />
      <Route path="/crud" element={<CRUD />} />
      <Route path="/login" element={<Login />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/users" element={<Users />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Tables" element={<Tables />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
