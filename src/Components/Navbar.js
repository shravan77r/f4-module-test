import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <h3>Shopping Cart</h3>
            <ul>
                <li><NavLink to="/">Home Page</NavLink></li>
                <li><NavLink to="/cart">Cart Page</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar;