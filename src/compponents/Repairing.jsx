import { Link } from 'react-router-dom';
import '../styles/repairing.scss';

const REPAIR_SERVICES = [
    { 
        id: 1, 
        category: "Phones & Tablets", 
        items: [
            { name: "Diagnostic", price: "Free (if repaired)" },
            { name: "Screen Replacement (OLED/LCD)", price: "From 1,800 UAH" },
            { name: "Battery Replacement", price: "From 950 UAH" },
            { name: "Charging Port Repair / Cleaning", price: "600 UAH" },
            { name: "Camera Glass Replacement", price: "400 UAH" }
        ]
    },
    { 
        id: 2, 
        category: "Laptops & MacBooks", 
        items: [
            { name: "Full Diagnostic", price: "300 UAH" },
            { name: "Cleaning + Thermal Paste Replacement", price: "700 UAH" },
            { name: "Keyboard Replacement", price: "From 1,200 UAH" },
            { name: "SSD Upgrade & OS Installation", price: "800 UAH" },
            { name: "Screen Matrix Replacement", price: "From 2,500 UAH" }
        ]
    },
    { 
        id: 3, 
        category: "Gadgets & Drones", 
        items: [
            { name: "Drone Propeller / Arm Fix", price: "From 800 UAH" },
            { name: "Smartwatch Battery Swap", price: "600 UAH" },
            { name: "Controller Diagnostic & Repair", price: "500 UAH" }
        ]
    }
];

function Repairing() {
    return (
        <section className="repairing-page">
            <div className="repairing-container">
                <h2 className="repairing-title">Service & Repair Center</h2>
                <p className="repairing-subtitle">
                    Professional diagnostics, component replacement, and maintenance for personal electronics. 
                    We use original parts and provide a warranty for all types of work.
                </p>

                <div className="repair-sections-grid">
                    {REPAIR_SERVICES.map(section => (
                        <div key={section.id} className="repair-category-card">
                            <h3 className="category-title">{section.category}</h3>
                            <ul className="service-list">
                                {section.items.map((item, index) => (
                                    <li key={index} className="service-item">
                                        <span className="service-name">{item.name}</span>
                                        <span className="service-dots"></span>
                                        <span className="service-price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="repair-info-block">
                    <div className="info-text">
                        <h3>How to reach us</h3>
                        <p>Got questions or need an urgent estimate? Drop by our service center or call our masters directly.</p>
                    </div>
                    <div className="contacts-list">
                        <div className="contact-item">
                            <span className="contact-label">Main Service Desk:</span>
                            <a href="tel:+380631234567" className="contact-value">+380 (63) 123-45-67</a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Master Technician:</span>
                            <a href="tel:+380689876543" className="contact-value">+380 (68) 987-65-43</a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Working Hours:</span>
                            <span className="contact-value plain">Mon – Sat: 10:00 – 19:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Repairing;