import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ProductPage({ addToCart, user }) {
    const navigation = useNavigate()

    const { id } = useParams()

    const [product, setProduct] = useState(null)

    const [error, setError] = useState('')

    const [rating, setRating] = useState('1')
    const [reviewText, setreviewText] = useState('')

    const [showSuccess, setShowSuccess] = useState(false)

    const reviewsList = product ? Object.entries(product.ratings).map(([email, info]) => ({
      email,
      ...(typeof info === 'object' ? info : { rating: info, userName: 'Anonymous', text: ''})
    })) : [];

    const [noUser, setNoUser] = useState(false)

    async function loadProduct() {
        try {
            const res = await fetch('http://localhost:5000/products')

            if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

            const data = await res.json()

            const foundProduct = data.find(p => p.id.toString() === id)

            setProduct(foundProduct)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProduct()
    }, [id])

    if (!product) return <h2>Failed to load product</h2>

    const formatDate = (isoString) => {
      const date = new Date(isoString);
      return new Date(isoString).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
        });
    };

    const handleReviewSubmit = async () => {
      if (!rating) {
        setError('Please, fill rating input')
        return
      } else {
        setError('')
      }

      const numericRating = Number(rating)
      if (numericRating < 1) {
        setError('Rating cannot be less than 1')
        return
      } else if (numericRating > 10) {
        setError('Rating cannot be more than 10')
        return
      } else {
        setError('')
      }

      const userString = localStorage.getItem('user')

      const user = userString ? JSON.parse(userString) : null

      if (!user || !user.email) return

      const reviewData = {
        productId: product.id,
        email: user.email,
        userName: user.name,
        rating: Number(rating),
        text: reviewText
      }

      try {
        const res = await fetch('http://localhost:5000/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reviewData)
        });

        if (res.ok) {
          await loadProduct()

          setRating('')
          setreviewText('')

          setShowSuccess(true)

          setTimeout(() => {
            setShowSuccess(false)
          }, 8000);
        } else {
          throw new Error(`HTTP error: ${res.status}`)
        }
      } catch(error) {
        console.log(error)
      }
    }

    console.log("Product data:", product);
    console.log("Ratings object:", product.ratings);

    return (
  <div className="product-page">
    <button onClick={() => navigation('/')}>Return to home</button>

    {showSuccess && <h2>Thanks for your review</h2>}

    <main className="product-layout">
      <header className="product-header">
        <img src={product.img} alt={product.name} width="700" height="400"/>
        <h1>{product.name}</h1>
        <p className="category">Category: <strong>{product.category}</strong></p>
      </header>

      <section className="product-stats">
        <div className="rating-display">
          <h3>Customer Rating</h3>
          <p className="current-rating">
            <strong>
              {product && product.rating !== undefined ? product.rating : "0"} / 10
            </strong>
          </p>
        </div>

        <div className="price-info">
          <p>Price: <strong>{product.price} UAH</strong></p>
          <p>Quantity available: {product.quantity}</p>
        </div>
      </section>

      <section className="description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </section>

      <section className="purchase-product-box">
        <h3>Like product, add it to cart</h3>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
      </section>

      <section className="review-section">
        <div className="rating-input">
          <h3>Rate this product</h3>
          <label htmlFor="rating">Select (1-10):</label>
          <input 
            type="number" 
            id="rating" 
            min="1" 
            max="10" 
            value={rating} 
            inputMode="numeric"

            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="review-input">
          <p>Leave a review:</p>
          <textarea 
            rows="5" 
            placeholder="Write your review here..."
            value={reviewText}

            onChange={(e) => setreviewText(e.target.value)}
          ></textarea>
        </div>
        
        <button className="submit-btn"
        onClick={() => {
          if (!user) {
            setNoUser(true)
            return
          }

          handleReviewSubmit()
        }} >
          Submit Review
        </button>
        {error && <p style={{color: 'red'}}>{error}</p>}
        {noUser && 
        <h2
        style={{color: 'rgb(163, 36, 36)'}}>Please, log in to rate products
        </h2>}
      </section>

      <section className="reviews-container">
        <h3>Customer Reviews</h3>
        <div className="reviews-list">
          {reviewsList && reviewsList
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(review => 
            <div className="review-card" key={review.email}>
              <div className="review-header">
                <h3 className="review-username">{review.userName}</h3>
                <span className="review-date">{formatDate(review.createdAt)}</span>
              </div>
              
              <div className="review-rating">
                Rating: <strong>{review.rating} / 10</strong>
              </div>
              
              <p className="review-text">{review.text}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  </div>
);
}

export default ProductPage