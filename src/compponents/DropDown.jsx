import { useState } from "react"
import "../styles/dropDown.scss";

function DropDown({ user, onLogout, onClose }) {
    const [isHistoryOpened, setIsHistoryOpened] = useState(false)

    const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]')

    const userOrders = ordersHistory.filter(order => order.email === user.email)
    

    return (
        <div className="dropdown">
    {user ? (
        <div className="dropdown-menu">

            <div className="dropdown-user-info">
                <p className="dropdown-name">
                    Name: {user.name[0].toUpperCase() + user.name.slice(1)}
                </p>

                <p className="dropdown-email">
                    Email: {user.email}
                </p>
            </div>

            <hr />

            <button className="dropdown-btn"
            onClick={() => setIsHistoryOpened(true)}>
                Purchase history
            </button>

            <button className="dropdown-btn logout"
            onClick={() => {
                onLogout()
                onClose()
            }}>
                Logout
            </button>

            <button className="dropdown-btn close"
            onClick={onClose}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {isHistoryOpened && (
            <div className="purchase-history-box">
                <h2>Your purchases history</h2>
                {userOrders.map(o => 
                    <div key={o.id}>
                        <h2>Order ID: {o.orderId}</h2>
                        <div>
                            <h2>All products:</h2>
                            {o.products.map(p => 
                            <div key={p.id}>
                                <h2>{p.productName}</h2>
                                <img src={p.productImage} alt={p.productName} width="80" height="30" />
                                <p>Price: {p.productPrice}UAH</p>
                                <p>Amount: {p.productCount}</p>
                            </div>
                            )}
                        </div>
                        <p>Delivery Method: {o.delivery}</p>
                        <p>Payment: {o.payment}</p>
                        <p>Total price: {o.totalPrice}UAH</p>
                    </div>
                )}
                <button onClick={() => setIsHistoryOpened(false)}>
                    Close history
                </button>
            </div>
            )}
        </div>
    ) : (
        <div className="dropdown-menu">

            <p className="dropdown-empty">
                No account found
            </p>

        </div>
    )}

</div>
    )
}

export default DropDown