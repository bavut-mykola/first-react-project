import { TOP_RATING_THRESHOLD } from "../constant";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/topProducts.scss";

function TopProducts({ addToCart, products }) {
    const top = products.filter(p => p.rating > TOP_RATING_THRESHOLD)

    const maxIndex = top.length - 2

    const [currentIndex, setCurrentIndex] = useState(0)

    function scrollRight() {
        if (currentIndex >= maxIndex) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 2)
        }
    }

    function scrollLeft() {
        if (currentIndex === 0) {
            setCurrentIndex(maxIndex)
        } else {
            setCurrentIndex(currentIndex - 2)
        }
    }
    
    return (
        <section id="top">
            <div className="top-products-texts">
            <h2 className="top-section-title">
                Top Products
            </h2>
            <p className="top-text">
                Products with the higher rating
            </p>
            </div>
            <div className="products-container">
                <div className="products-track"
                style={{ transform: `translateX(calc(-${currentIndex} * (50% + 20px)))` }}
                >
                    {top.map(p => 
                        <Link to={`/product/${p.id}`} className="product-box" key={p.id}>
                            <div className="image-container">
                                <img className="product-img" src={p.img} alt={p.name} />
                            </div>
                            <div className="product-info">
                                <h2 className="product-title">{p.name}</h2>
                                {/* <p className="product-rating">Rating: {p.rating}</p> */}
                                <p className="product-price">{p.price} UAH</p>
                            </div>
                            <button className="product-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                addToCart(p)
                            }}>Add to cart</button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="arrows-box">
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
        </section>
    )
}

export default TopProducts