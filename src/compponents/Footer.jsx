import "../styles/footer.scss"

function Footer() {
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
                <nav className="footer-links">
                    <a href="#home" className="footer-link">HOME</a>
                    <a href="#catalog" className="footer-link">CATALOG</a>
                    <a href="#top" className="footer-link">TOP</a>
                </nav>
            <div className="footer-number">
                <p>Customer support: 034 687 91 67</p>
            </div>
        </footer>
        </>
    )
}

export default Footer