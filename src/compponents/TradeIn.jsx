import { Link } from 'react-router-dom';
import '../styles/tradeIn.scss';

function TradeIn() {
    return (
        <section className="tradein-page">
            <div className="tradein-container">
                <h2 className="tradein-title">ELIX Trade-In Program</h2>
                <p className="tradein-subtitle">
                    Upgrade your tech effortlessly. Bring in your old smartphone, tablet, or laptop, 
                    get an instant evaluation, and trade it in toward a brand new purchase with a discount.
                </p>

                <div className="tradein-grid">
                    <div className="tradein-card">
                        <h3>1. Evaluation</h3>
                        <p>Bring your device to our service center or submit details online. Our specialists will check its condition and estimate its market value.</p>
                    </div>

                    <div className="tradein-card">
                        <h3>2. Instant Discount</h3>
                        <p>The assessed value of your old gadget is directly deducted from the price of any new product or used item in our store.</p>
                    </div>

                    <div className="tradein-card">
                        <h3>3. Quick Transfer</h3>
                        <p>We help you securely wipe your personal data, transfer files to your new device, and complete the exchange in just 15 minutes.</p>
                    </div>
                </div>

                <div className="tradein-info-box">
                    <h3>Accepted Devices & Conditions</h3>
                    <p>
                        We accept smartphones, tablets, and laptops of popular brands (Apple, Samsung, ASUS, Lenovo, etc.). 
                        The device should power on, have no critical board damage, and include original accessories if possible for a higher valuation. 
                        Locked or iCloud/Google-locked devices are not accepted.
                    </p>
                </div>

                <div className="tradein-cta">
                    <h3>Ready to upgrade your device?</h3>
                    <p>Visit our store today for a fast evaluation or contact our team for preliminary estimates.</p>
                    <Link to="/contacts" className="tradein-btn">Contact Us</Link>
                </div>
            </div>
        </section>
    );
}

export default TradeIn;