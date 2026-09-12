import { Link } from 'react-router-dom';
import '../styles/prices.scss';

function Prices() {
    return (
        <section className="prices-page">
            <div className="prices-container">
                <div className="unavailable-box">
                    <h2 className="prices-title">Currently Unavailable</h2>
                    <p className="prices-subtitle">
                        This section is currently under maintenance or being updated with new pricing plans. Please check back later.
                    </p>
                    <Link to="/" className="prices-btn">Return to Home</Link>
                </div>
            </div>
        </section>
    );
}

export default Prices;