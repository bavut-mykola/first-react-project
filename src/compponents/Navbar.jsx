import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom"
import Fuse from "fuse.js";
import DropDown from "./DropDown";
import "../styles/navbar.scss";

function Navbar({ user, onLogout, cart, products, addToCart }) {
    const navigation = useNavigate()

    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)

    const [isSearchEmpty, setIsSearchEmpty] = useState(true)

    const [isSearchOpened, setIsSearchOpened] = useState(false)

    const [search, setSearch] = useState('')

    const [isSearched, setIsSearched] = useState(false)

    const inputRef = useRef(null)

    const inputWrapperRef = useRef(null)
    const inputButtonRef = useRef(null)
    const dropDownRef = useRef(null)

    const fuse = new Fuse(products, {
        keys: ["name"],
        threshold: 0.3,
    });

    const filteredProducts = search === "" 
        ? []
        : fuse.search(search).map(result => result.item);

    console.log(products)
    
    const hiddenPaths = ['/cart', '/auth', '/checkout', '/order-details'];
    const isHidden = hiddenPaths.includes(location.pathname);

    function closeDropDown() {
        setIsOpen(false)
    }

    useEffect(() => {
    function handleClickOutside(e) {
        const isClickInsideInput =
            inputWrapperRef.current?.contains(e.target);

        const isClickInsideButton =
            inputButtonRef.current?.contains(e.target);

        const isClickInsideDropDown =
            dropDownRef.current?.contains(e.target);

            console.log(dropDownRef.current);
            console.log(e.target);
            console.log(dropDownRef.current?.contains(e.target));

        if (isClickInsideInput || isClickInsideButton || isClickInsideDropDown) {
            return; 
        }
        
        setIsSearchOpened(false);
        setIsSearchEmpty(true);
        setIsSearched(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []); 

    const [currentIndex, setCurrentIndex] = useState(0)

    const maxIndex = Math.max(0, filteredProducts.length - 3);

    function scrollRight() {
        if (currentIndex === maxIndex) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    function scrollLeft() {
        if (currentIndex <= 0) {
            setCurrentIndex(maxIndex)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
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
                    <button className="search-open-btn"
                    ref={inputButtonRef}
                    onClick={() => {
                        setIsSearchOpened(!isSearchOpened)
                        setIsSearched(false)
                    }} >
                        <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                )}
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

        {location.pathname === '/' && (
            <>
            <div className={isSearchOpened ? 'input-box-wrapper opened' : 'input-box-wrapper closed'}
            ref={inputWrapperRef} >
                <div className="dropdown-input-box">
                    <label className={search.length > 0 ? "hidden-label" : ""}
                    htmlFor="search-input">Search for products</label>
                    <input type="text" className="search-input"
                    ref={inputRef} value={search}
                    onChange={(e) => { 
                        const value = e.target.value
                        setSearch(value)

                        if (value.length >= 1) setIsSearchEmpty(false)
                            else setIsSearchEmpty(true) 
                        
                        setIsSearched(true)
                    }}
                    onKeyDown={(e) => {
                        const inputValue = e.target.value

                        if (inputValue.length < 1 && e.key === 'Backspace') {
                            setIsSearchOpened(false)
                            setIsSearched(false)
                            inputRef.current.blur()
                        }
                    }}
                    />
                </div>
            </div>

            <div ref={dropDownRef}
            className={!isSearched ? 'dropdown-main main-close' : 'dropdown-main main-open'}
            > 

                <div className="dropdown-search">
                    <div className="search-top">

                        <div className="top-text">
                            {
                                !isSearched
                                ? <h3 className="top-title">
                                    Search for your next favorite product
                                </h3> 
                                : filteredProducts.length !== 0 
                                ? <h3 className="top-title">Recommended products</h3>
                                : <h3 className="top-title">No results found</h3>
                            }
                        </div>

                        {filteredProducts.length > 3 && (
                            <div className="arrows-buttons">
                                <button className="arrow"
                                onClick={scrollLeft}
                                >
                                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>

                                <button className="arrow"
                                onClick={scrollRight}
                                >
                                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </div> 
                        )}
                        
                    </div> {/* search-top */}

                    <div className="search-result">
                            <div className="nav-products-container"
                            style={{ 
                                transform: `translateX(calc(-${currentIndex} * (33.333% + 10px)))` }}
                            >
                                {filteredProducts.map(product => {
                                    if (!product) return null
                                    return (
                                    <Link to={`/product/${product.id}`}
                                    className="nav-product-box" key={product.id}
                                    onClick={() => {
                                        setIsSearchOpened(false);
                                        setIsSearchEmpty(true);
                                        setIsSearched(false);
                                        setSearch('')
                                    }}
                                    >
                                        <div className="left-product-box">
                                            <div className="nav-image-wrapper">
                                                <img className="nav-product-image" src={product.img} alt={product.name} />
                                            </div>
                                        </div>

                                        <div className="right-product-box">
                                            <div className="product-text-box">
                                                <p className="nav-product-name">
                                                    {product.name}
                                                </p>

                                                <p className="nav-product-price">
                                                    {product.price} UAH
                                                </p>   
                                            </div>                               

                                            <div className="bottom-right-box">
                                                <button className="product-btn"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    addToCart(product)
                                                }} >
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                    )
                                    })}
                            </div>
                    </div> {/* search-result */}

                </div> {/* search */}

            </div> {/* main  */}
         </>
        )}

        {isOpen && user && <DropDown 
        user={user} onLogout={onLogout} onClose={closeDropDown}/>}
        </>
    )
}

export default Navbar