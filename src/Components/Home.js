
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productAction";
import { addToCart } from "../redux/actions/cartActions";

const Home = () => {
       const { loading, data, error } = useSelector(state => state.product)
       const cartData = useSelector(state => state.cart)

       console.log(data)
       console.log("Cart", cartData)

       const dispatch = useDispatch()

       useEffect(() => {
              dispatch(fetchProducts())
       }, [dispatch])

       function addCart(product) {
              dispatch(addToCart(product));
              // add to loacal storage
              let cart = JSON.parse(localStorage.getItem("cart"))
              if (!cart) {
                     cart = []
              }

              const existingItem = cart.find((cartItem) => cartItem.id === product.id);
              if (existingItem) {
                     alert("Item already exists in cart");
              } else {
                     localStorage.setItem("cart", JSON.stringify([...cart, product]));
                     alert("Item added to cart");
              }
       }

       return (
              <div>
                     <h1 class="page-heading">All Items</h1>
                     <div className="product-list">
                            {data && data.map((product) => (
                                   <div className="product" key={product.id}>
                                          <img src={product.thumbnail} alt="products" />
                                          <h2 className="product-title">Title : {product.title}</h2>
                                          <p className="product-price">Price : {product.price}</p>
                                          <button className="add-to-cart" onClick={() => addCart(product)}>Add to Cart </button>

                                   </div>
                            ))
                            }
                     </div>
              </div>
       )
}

export default Home;