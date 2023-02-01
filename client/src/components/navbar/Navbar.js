import React from "react";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { LoggedIn, User } = useAuth();
  //console.log(LoggedIn);
  const { items } = useBasket();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">e-commerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!LoggedIn && (
          <>
            <Link to="./signin">
              <Button colorScheme="blue">Login</Button>
            </Link>
            <Link to="./signup">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        )}
        {LoggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="green" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}
            {User?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="gray" variant="ghost">Admin</Button>
              </Link>
            )}
            <Link to="/profile" >
              <Button colorScheme="red" >Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
