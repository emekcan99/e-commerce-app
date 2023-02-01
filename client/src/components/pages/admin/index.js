import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./admin-menu.css";


function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
        <Outlet></Outlet>
    </div>
  );
}

export default Admin;
