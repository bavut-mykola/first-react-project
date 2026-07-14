import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./compponents/Navbar";
import Home from "./compponents/Home";
import Products from './compponents/Products'
import TopProducts from './compponents/TopProducts'
import Footer from "./compponents/Footer";
import Auth from './compponents/Auth'
import Cart from "./compponents/Cart";
import Checkout from "./compponents/Checkout";
import OrderDetails from "./compponents/orderDetails";
import ProductPage from "./compponents/ProductPage";
import "./styles/global.scss";

function App() {
    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(false)

    const [products, setProducts] = useState([])

    async function loadProducts() {
        try {
            setLoading(true)

            const res = await fetch('http://localhost:5000/products')

            if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

            const data = await res.json()

            setProducts(data)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    console.log(products);

    function loginUser(userData) {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    useEffect(() => {
        const savedUser = localStorage.getItem('user')

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    function logoutUser() {
        setUser(null)
        localStorage.removeItem('user')
    }

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    )

    function addToCart(product) {
        const added = cart.find(item => item.id === product.id)

        if (added) {
            added.count = added.count + 1
            setCart([...cart])
        } else {
            const newProduct = {...product, count: 1}
            setCart([...cart, newProduct])
        }
    }

    function removeFromCart(productToRemove) {
        setCart(cart.filter(product => product.id !== productToRemove.id))
    }

    function clearCart() {
        setCart([])
    }

    function decreaseCount(product) {
        const added = cart.find(item => item.id === product.id)

        if (added && added.count > 1) {
            added.count = added.count - 1
            setCart([...cart])
        } else {
            removeFromCart(product)
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const productsSectionRef = useRef(null)

    const scrollToProducts = () => {
        productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>   
        <h2>{loading && 'Loading products...'}</h2>
        <Navbar user={user} onLogout={logoutUser} cart={cart} />
        <Routes>
            <Route path='/' element={
                <>
                <Home onScrollToProducts={scrollToProducts} />
                <div ref={productsSectionRef}>
                    <Products addToCart={addToCart} products={products} />
                </div>
                <TopProducts addToCart={addToCart} products={products} />
                <Footer />
                </>
            }/>

            <Route path="/auth" element={<Auth onLogin={loginUser}/>}/>

            <Route path="/cart" 
            element={
                <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} 
                addToCart={addToCart} decreaseCount={decreaseCount}
                />} />

            <Route path="/checkout" element={
                <Checkout cart={cart} clearCart={clearCart} />} />

            <Route path="/order-details" element={<OrderDetails />} />

            <Route path="/product/:id" element={<ProductPage addToCart={addToCart} user={user} />} />
        </Routes>
        </> 
    )
}

export default App;