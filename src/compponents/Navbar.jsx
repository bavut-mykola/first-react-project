import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom"
import DropDown from "./DropDown";
import "../styles/navbar.scss";

function Navbar({ user, onLogout, cart }) {
    const navigation = useNavigate()

    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)

    const hiddenPaths = ['/cart', '/auth', '/checkout', '/order-details'];
    const isHidden = hiddenPaths.includes(location.pathname);

    function closeDropDown() {
        setIsOpen(false)
    }

    return (
        <>
        <header className="header">
                <div className="logo-box">
                <h2 className="logo"
                onClick={() => navigation('/')}>
                ELIX</h2>
            </div>

            {location.pathname === '/' && (
                <nav className="navigation">
                    <a href="#home" className="nav-link">home</a>
                    <a href="#catalog" className="nav-link">catalog</a>
                    <a href="#top" className="nav-link">top</a>
                </nav>
            )}

            <div className="main-buttons-box">
                {!isHidden && (
                    <button className="cart-btn"
                onClick={() => navigation('/cart')}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path>
                    </svg>
                    {cart.length > 0 && (
                        <span className="cart-count">
                            {cart.length > 0 && cart.reduce((acc, curr) => acc + curr.count, 0)}
                        </span>
                    )}
                </button>
                )}

                {!isHidden && location.pathname !== '/auth' && (
                    user ? (
                    <button className="account-btn active-account"
                    onClick={() => setIsOpen(!isOpen)}>
                        <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    </svg>
                    </button>
                ) : (
                    <button
                className="account-btn"
                onClick={() => navigation('/auth')}>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    </svg>
                </button>
                )
                )}
            </div>
        </header>

        {isOpen && user && <DropDown 
        user={user} onLogout={onLogout} onClose={closeDropDown}/>}
        </>
    )
}

export default Navbar