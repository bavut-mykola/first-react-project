import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function OrderDetails() {
    const [order, setOrder] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const savedOrder = localStorage.getItem('ordersHistory')
        
        if (savedOrder) {
            const orderList = JSON.parse(savedOrder);
            setOrder(orderList[orderList.length - 1]);
        }
    }, [])

    if (!order) {
        return <h2>Order is loading...</h2>
    }

    return (
        <div className="order-details-page">
            <div className="success-header">
                <h2 className="success-title">Order Confirmed!</h2>
                <p className="order-subtitle">
                    Thank you for shopping with us! We have successfully received your order. 
                    Our team is already busy packing your items with care. 
                    You will receive an email notification as soon as your order is dispatched.
                </p>
            </div>

            <div className="order-info-block">
                <h3>Order Overview</h3>
                <p><strong>Order ID:</strong> #{order.orderId}</p>
                <p>
                    We will send a tracking number to your phone number <strong>{order.phone}</strong> 
                    once the parcel is on its way. Expect a call from our manager within the next 
                    30 minutes to finalize your shipping details.
                </p>
            </div>

            <div className="order-summary-card">
                <h3>Shipping & Payment</h3>
                <p><strong>Recipient:</strong> {order.name}</p>
                <p><strong>Delivery Method:</strong> {order.delivery === 'office' ? 'Post Office Delivery' : 'Courier delivery to your home'}</p>
                <p><strong>Payment Method:</strong> {order.payment === 'cash' ? 'Cash on delivery (upon receipt)' : 'Card online (paid)'}</p>
            </div>

            <div className="order-items-card">
                <h3>Your Purchase</h3>
                {order.products.map((item, index) => (
                    <div key={index} className="order-item">
                        <span>{item.productName} <strong>(x{item.productCount})</strong></span>
                        <span>{item.productPrice * item.productCount} UAH</span>
                    </div>
                ))}
                <div className="total-price">
                    <strong>Total Amount to Pay: {order.totalPrice} UAH</strong>
                </div>
            </div>

            <div className="order-footer">
                <p>
                    If you have any questions or need to make changes to your order, 
                    please contact our support team immediately. 
                    We are available 24/7 to assist you.
                </p>
                <button className="back-home-btn" onClick={() => navigate('/')}>
                    Return to Main Page
                </button>
            </div>
        </div>
    )
    
}

export default OrderDetails