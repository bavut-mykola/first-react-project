import { useState } from "react"
import "../styles/dropDown.scss";

function DropDown({ user, onLogout, onClose }) {
    const [isHistoryOpened, setIsHistoryOpened] = useState(false)

    const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]')

    const userOrders = ordersHistory.filter(order => order.email === user.email)
    
console.log(user);
    return (
        <div className="dropdown">

            <div className="dropdown-overlay" onClick={onClose} />
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