import { Link } from 'react-router-dom';
import '../styles/delivery.scss';

function Delivery() {
    return (
        <section className="delivery-page">
            <div className="delivery-container">
                <h2 className="delivery-title">Delivery & Shipping</h2>
                <p className="delivery-subtitle">
                    We ensure fast, safe, and reliable delivery of your electronics and accessories across Ukraine. 
                    Review our shipping partners, terms, and conditions below.
                </p>

                <div className="delivery-grid">
                    <div className="delivery-card">
                        <h3>Nova Poshta</h3>
                        <p className="delivery-desc">Delivery to a branch, postamat, or courier right to your door across Ukraine.</p>
                        <span className="delivery-time">1–3 business days</span>
                        <span className="delivery-cost">According to carrier rates</span>
                    </div>

                    <div className="delivery-card">
                        <h3>Ukrposhta</h3>
                        <p className="delivery-desc">Standard postal shipping option available for all regions and local towns.</p>
                        <span className="delivery-time">2–5 business days</span>
                        <span className="delivery-cost">Affordable rates</span>
                    </div>

                    <div className="delivery-card">
                        <h3>Local Pickup</h3>
                        <p className="delivery-desc">Pick up your order directly from our local service center and store.</p>
                        <span className="delivery-time">Same day (ready in 2 hours)</span>
                        <span className="delivery-cost">Free</span>
                    </div>
                </div>

                <div className="delivery-info-section">
                    <div className="info-box">
                        <h3>Order Tracking</h3>
                        <p>Once your order is dispatched, you will receive an SMS and email notification containing your tracking number to monitor your parcel in real-time.</p>
                    </div>
                    <div className="info-box">
                        <h3>Inspection Upon Receipt</h3>
                        <p>We strongly recommend checking your items for integrity and completeness directly at the carrier branch in the presence of an employee.</p>
                    </div>
                </div>

                <div className="delivery-cta">
                    <h3>Have questions regarding your shipment?</h3>
                    <p>Contact our support team or visit our contacts page for direct assistance.</p>
                    <Link to="/contacts" className="delivery-btn">Contact Us</Link>
                </div>
            </div>
        </section>
    );
}

export default Delivery;