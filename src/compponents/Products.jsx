import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/products.scss';

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "phones", label: "Phones" },
    { value: "laptops", label: "Laptops" },
    { value: "gadgets", label: "Gadgets" },
    { value: "tablets", label: "Tablets" },
    { value: "accessories", label: "Accessories" },
    { value: "gaming", label: "Gaming" },
    { value: "cameras", label: "Cameras" },
    { value: "drones", label: "Drones" },
];

function Products({ addToCart, products }) {
    const [category, setCategory] = useState("all");

    const [currentIndex, setCurrentIndex] = useState(0)

    const filteredProducts = useMemo(() => {
        if (category === "all") return products;
        return products.filter(p => p.category === category);
    }, [category, products]);

    function scrollRight() {
        if (currentIndex === 28) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 2)
        }
    }

    function scrollLeft() {
        if (currentIndex === 0) {
            setCurrentIndex(28)
        } else {
            setCurrentIndex(currentIndex - 2)
        }
    }

    return (
        <section id="catalog" className="products-page-container">
            <div className="products-top">
                <h2 className="catalog-title">Our Products</h2>

                <div className="filter-box">
                    <label htmlFor="category-select">Filter by Category: </label>
                    <select
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="products-container">
                <div className="products-track"
                style={{ transform: `translateX(calc(-${currentIndex} * (50% + 20px)))` }}
                >
                    {filteredProducts.length > 0 ? (
                    filteredProducts.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="product-box">
                            <div className="image-container">
                                <img className="product-img" src={p.img} alt={p.name} />
                            </div>
                            <div className="product-info">
                                <h2 className="product-title">{p.name}</h2>
                                <p className="product-price">{p.price} UAH</p>
                            </div>
                            <button className="product-btn" onClick={(e) => {
                                e.preventDefault()
                                addToCart(p)
                            }}>Add to cart</button>
                        </Link>
                    ))
                ) : (
                    <p className="no-results">No products found in this category.</p>
                )}
                </div>
            </div>
            <div className="arrows-box">
                <button className="arrow"
                onClick={scrollLeft}>
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <button className="arrow"
                onClick={scrollRight}>
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default Products;