import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/catalog.scss'

function Catalog({ products, addToCart}) {
    const catalogRef = useRef()

    const [activeFilter, setActiveFilter] = useState('All')

    const [currentPage, setCurrentPage] = useState(1);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 420);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 420);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function changeActiveFilter(f) {
        setActiveFilter(f)
        setCurrentPage(1)
    }

    const itemsPerPage = 10;

    const sortedProducts = [...products.sort((a,b) => {
        if (activeFilter === 'All') {
            return a.id - b.id
        }
        if (activeFilter === 'Popular') {
            return b.rating - a.rating
        }
        if (activeFilter === 'Cheap') {
            return a.price - b.price
        }
        if (activeFilter === 'Expensive') {
            return b.price - a.price
        }
        return 0;
    })]

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentProducts = isSmallScreen 
    ? sortedProducts.slice(indexOfFirstItem, indexOfLastItem) 
    : sortedProducts;

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    return (
        <>
        <div className="catalog-header">
            <div className="header-texts-box">
                <h1 className="header-title">Store Collection</h1>
                <p className="header-text">
                Explore our carefully curated selection of premium products designed for your
                everyday needs. Find your favorites and experience exceptional quality today.
                </p>
            </div>
            <div className="header-button-box">
                <button
                className="header-catalog-btn"
                onClick={() => {
                    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                    To Products
                </button>
            </div>
        </div> 

        <div className="catalog-main" ref={catalogRef}>
            <div className="catalog-top">
                <h3 className="top-title">Catalog</h3>
                <div className="filter-box">
                    <p className="filter-title">
                        Sort by:
                    </p>
                    <div className="filter-spans">
                        <span className={activeFilter === 'All' ? 'active-filter' : ''}
                        onClick={() => {
                            changeActiveFilter('All')
                        }}>All</span>
                        <span className={activeFilter === 'Popular' ? 'active-filter' : ''}
                        onClick={() => {
                            changeActiveFilter('Popular')
                        }}>Popular</span>
                        <span className={activeFilter === 'Cheap' ? 'active-filter' : ''}
                        onClick={() => {
                            changeActiveFilter('Cheap')
                        }}>Cheap</span>
                        <span className={activeFilter === 'Expensive' ? 'active-filter' : ''}
                        onClick={() => {
                            changeActiveFilter('Expensive')
                        }}>Expensive</span>
                    </div>
                </div>
            </div>

            <div className="products-main-box">
                <div className="products-boxes">
                    {currentProducts.map(p => (
                        <div  key={p.id} className="product-box">
                            <div className="image-box">
                                {p.rating >= 6.5 && (
                                    <span className="popular-mark">Popular</span>
                                )} 
                                <Link to={`/product/${p.id}`} className="image-animation-box">
                                    <img src={p.img} alt={p.name} className="product-image" />
                                </Link>
                            </div>
                            <div className="product-info">
                                <p className="product-price">{p.name}</p>
                                <p className="product-price">{p.price} UAH</p>
                            </div>
                            <button className="buy-btn" 
                            onClick={(e) => {
                            e.preventDefault()
                            addToCart(p)}} >Add to cart</button>
                        </div>
                    ))}
                </div>
            </div>

            {isSmallScreen && (
            <div className="pagination-box">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                        <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={currentPage === pageNumber ? 'page-btn active' : 'page-btn'}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            )}
        </div>
        </>  
    )   
}

export default Catalog