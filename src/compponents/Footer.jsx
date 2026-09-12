import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import "../styles/footer.scss"

function Footer() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("/data/services.json")
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Error loading services:", err));
    }, []);
    return (
        <>
        <div className="disclaimer-nav-box">
                <h3 className="disclaimer-title">
                    ⚠️ Demo Store — For educational purposes only. No real purchases or payments are processed.
                </h3>
        </div>

        <footer className="footer">
            <div className="footer-logo">
                <h3>ELIX</h3>
            </div>
            <div className="left-footer">
                <nav className="footer-links">
                    <a href="#home" className="footer-link">HOME</a>
                    <a href="#catalog" className="footer-link">CATALOG</a>
                    <a href="#top" className="footer-link">TOP</a>
                </nav>
            <div className="footer-number">
                <p>Customer support:</p>
                <p>034 687 91 67</p>
            </div>
            </div>

            <div className="right-footer">
                <h3 className="service-title">
                    Our Services
                </h3>
                <div className="services-links">
                    {services.map(s => (
                        <Link key={s.id} to={s.path} className="service-link">{s.title}</Link>
                    ))}
                </div>
            </div>

            <div className="middle-footer">
                <button className="footer-button">
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="#000"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="40px" height="40px">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </button>
                <button className="footer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="#000" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </button>
                <button className="footer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="#000" class="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                    </svg>
                </button>
            </div>
        </footer>
        </>
    )
}

export default Footer