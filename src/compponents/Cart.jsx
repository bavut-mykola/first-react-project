import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/cart.scss'

function Cart({ cart, removeFromCart, clearCart, addToCart, decreaseCount }) {
    const navigation = useNavigate()

    return (
    <div className="cart-page">
        <div className="cart-header">
            <h2>Shopping Cart</h2>
            {cart.length !== 0 && (
            <button className="back-btn" onClick={() => navigation('/')}>
                Back to Shop
            </button>
            )}
        </div>

        {cart.length !== 0 ? (
            <div className="cart-container">
            <div className="cart-items-list">
                {cart.map(p => (
                    <div key={p.id} className="cart-item">
                        <div className="cart-item-details">
                            <img className="cart-item-img" src={p.img} alt={p.name} />
                            <div className="name-quant-total-box">
                                <h2 className="cart-item-title">{p.name}</h2>
                                <p className="cart-item-quantity">Quantity: {p.count}</p>
                                <p className="cart-item-total">Total: {p.price * p.count} UAH</p>
                            </div>
                        </div>
    
                        <div className="cart-item-actions">
                            <button className="btn-quantity btn-increase" onClick={() => addToCart(p)}>+</button>
                            <button className="btn-quantity btn-decrease" onClick={() => decreaseCount(p)}>-</button>
                            <button className="btn-remove" onClick={() => removeFromCart(p)}>Remove from Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-details">
                    <p>Total Items: 
                        <span>{cart.reduce((acc, curr) => acc + curr.count, 0)}</span>
                    </p>
                    <p>Total Price: 
                        <span>{cart.reduce((acc, curr) => acc + curr.price * curr.count, 0)} UAH</span>
                    </p>
                </div>
                <div className="summary-buttons">
                    <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                    <button className="checkout-btn" onClick={() => navigation('/checkout')}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
        ) : (
            <div className="cart-empty">
                <h2 className="empty-title">Your cart is currently empty</h2>
                <p className="empty-text">
                    Before you can proceed to checkout, you must add some products to your shopping cart.
                </p>
                <button className="empty-btn" onClick={() => navigation('/')}>
                    Return to Shop
                </button>
            </div>
        )}
    </div>
    );
}

export default Cart