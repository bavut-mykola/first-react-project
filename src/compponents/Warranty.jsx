import { Link } from 'react-router-dom';
import '../styles/warranty.scss';

function Warranty() {
    return (
        <section className="warranty-page">
            <div className="warranty-container">
                <h2 className="warranty-title">Warranty & Support</h2>
                <p className="warranty-subtitle">
                    We stand by the quality of our repairs and products. Learn more about our warranty terms, 
                    coverage periods, and conditions for service guarantees.
                </p>

                <div className="warranty-grid">
                    <div className="warranty-card">
                        <h3>Repair Warranty</h3>
                        <p className="warranty-desc">All repair services and replaced replacement parts are covered by a standard warranty period.</p>
                        <span className="warranty-term">3 to 6 Months</span>
                    </div>

                    <div className="warranty-card">
                        <h3>Store Products</h3>
                        <p className="warranty-desc">Brand new accessories and gadgets purchased directly from our catalog include a manufacturer warranty.</p>
                        <span className="warranty-term">12 Months</span>
                    </div>

                    <div className="warranty-card">
                        <h3>Quality Check</h3>
                        <p className="warranty-desc">Every device undergoes rigorous multi-point testing before being handed back to the customer.</p>
                        <span className="warranty-term">100% Tested</span>
                    </div>
                </div>

                <div className="warranty-info-box">
                    <h3>Warranty Terms & Conditions</h3>
                    <p>
                        The warranty covers defects in materials and workmanship under normal use. It does not cover physical damage caused by drops, 
                        liquid ingress (unless waterproof repair was specified), unauthorized tampering, or wear and tear. Please keep your service receipt 
                        or invoice to claim warranty support.
                    </p>
                </div>

                <div className="warranty-cta">
                    <h3>Need to claim a warranty service?</h3>
                    <p>Visit our service center or get in touch with our team for quick diagnostics.</p>
                    <Link to="/support" className="warranty-btn">Contact Support</Link>
                </div>
            </div>
        </section>
    );
}

export default Warranty;