import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/support.scss';

const FAQ_ITEMS = [
    {
        q: "How can I check the status of my device repair?",
        a: "You can check your repair status by calling our main desk directly with your receipt number, or by reaching out via Telegram/Viber using the contacts below."
    },
    {
        q: "What should I do before bringing my gadget for service?",
        a: "We recommend backing up all your personal data, removing SIM/memory cards, and disabling security locks (like Find My iPhone or Google FRP lock) if possible."
    },
    {
        q: "How long does a standard diagnostic take?",
        a: "Standard hardware and software diagnostics usually take from 1 to 2 business days. For minor issues, we can evaluate your device on the spot."
    },
    {
        q: "Do you provide a warranty for replaced parts?",
        a: "Yes, all our repair works and replacement components come with a standard warranty ranging from 3 to 6 months."
    }
];

function Support() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="support-page">
            <div className="support-container">
                <h2 className="support-title">Customer Support Center</h2>
                <p className="support-subtitle">
                    Need assistance with your purchase, tracking an order, or looking for technical guidance? 
                    Our support team and engineers are here to help you resolve any issues quickly.
                </p>

                <div className="support-grid">
                    <div className="support-card">
                        <h3>Technical Assistance</h3>
                        <p>Consult with professional technicians regarding hardware performance, software crashes, or custom repair estimates.</p>
                        <span className="support-action-text">Available Mon–Sat</span>
                    </div>

                    <div className="support-card">
                        <h3>Order & Delivery Help</h3>
                        <p>Having trouble with parcel tracking, carrier delays, or shipping address changes? We coordinate directly with postal services.</p>
                        <span className="support-action-text">Fast Response</span>
                    </div>

                    <div className="support-card">
                        <h3>Warranty Claims</h3>
                        <p>Submit claims for warranty servicing, request device testing reports, or arrange secondary quality check inspections.</p>
                        <span className="support-action-text">Official Terms</span>
                    </div>
                </div>

                <div className="support-faq-section">
                    <h3>Frequently Asked Questions</h3>
                    <div className="faq-list">
                        {FAQ_ITEMS.map((item, index) => (
                            <div 
                                key={index} 
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="faq-question">
                                    <span>{item.q}</span>
                                    <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="support-contact-channels">
                    <h3>Direct Support Channels</h3>
                    <p>Choose your preferred way to reach our support desk for immediate assistance.</p>
                    <div className="channels-grid">
                        <a href="tel:+380631234567" className="channel-box">
                            <span className="channel-title">Phone Support</span>
                            <span className="channel-value">+380 (63) 123-45-67</span>
                        </a>
                        <a href="mailto:support@elix.store" className="channel-box">
                            <span className="channel-title">Email Inquiry</span>
                            <span className="channel-value">support@elix.store</span>
                        </a>
                        <div className="channel-box static">
                            <span className="channel-title">Working Hours</span>
                            <span className="channel-value">Mon – Sat: 10:00 – 19:00</span>
                        </div>
                    </div>
                </div>

                <div className="support-cta">
                    <h3>Still couldn't find what you were looking for?</h3>
                    <p>Visit our main contact page for store locations, feedback forms, and direct messaging links.</p>
                    <Link to="/contacts" className="support-btn">Open Contacts Page</Link>
                </div>
            </div>
        </section>
    );
}

export default Support;