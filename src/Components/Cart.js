
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, checkout, addToCart } from "../redux/actions/cartActions"


const Cart = () => {
        const cartData = useSelector(state => state.cart)
        console.log(cartData)

        const dispatch = useDispatch()

        useEffect(() => {
                // check if cart has some values: 
                if (cartData.length == 0) {
                        // get from local storage
                        let cart = JSON.parse(localStorage.getItem("cart"))

                        cart.map(item => {
                                dispatch(addToCart(item))
                        })

                }

        }, [dispatch])



        function remove(id) {
                dispatch(removeFromCart(id))
                // update local storage
                let cart = JSON.parse(localStorage.getItem("cart"))
                let newCart = cart.filter(item => item.id != id)
                localStorage.setItem("cart", JSON.stringify(newCart))
                alert("Item removed from cart");
        }

        function reset() {
                dispatch(checkout())
                // update local storage
                localStorage.setItem("cart", JSON.stringify([]))
                alert('Items have been checkout out');
        }


        const totalAmount = cartData.reduce((acc, item) => acc + item.price, 0);

        return (
                <div>
                        <h1 class="page-heading">My Cart</h1>
                        <div className="cart-page">
                        <div className="product-list cart-list">
                                {cartData.length != 0 && cartData.map((product) => (
                                        <div className="product" key={product.id}>
                                                <img src={product.thumbnail} alt="products" />
                                                <h2 className="product-title">Title : {product.title}</h2>
                                                <p className="product-price">Price : {product.price}</p>
                                                <button className="add-to-cart" onClick={() => remove(product.id)} > Remove Item</button>

                                        </div>
                                ))
                                }
                        </div>
                        <div className="CheckoutList">
                                <h6 className="total-heading">Checkout List</h6>
                                <table className="checkout-list-tbl">

                                        {cartData.length != 0 && cartData.map((product, index) => (
                                                <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{product.title}</td>
                                                        <td>{product.price}</td>
                                                </tr>
                                        ))
                                        }
                                        <tr>
                                                <td colSpan={2}>Total</td>
                                                <td>{totalAmount}</td>
                                        </tr>
                                </table>
                                <button className="Checkout" onClick={reset}>Checkout</button>
                        </div>
                        </div>
                </div>
        )
}

export default Cart;