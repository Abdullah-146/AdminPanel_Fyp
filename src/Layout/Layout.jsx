import React from "react";
import SideBar from "./SideBar";
import "./layout.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Layout({ children }) {
  return (
    <>
      <SideBar />
      <main>{children}</main>
      <ToastContainer theme="dark" />
    </>
  );
}

export default Layout;
