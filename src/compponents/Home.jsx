import homeBg from '../images/home_bg_2.png';
import "../styles/home.scss";

function Home({ onScrollToProducts }) {
    return (
        <section id="home">
            <div className="home-content">
            <h1 className="home-title">
                Find Your Perfect Device
            </h1>
            <p className="home-text">
                Browse phones, laptops, accessories and more.
            </p>
            <button className="home-btn"
            onClick={onScrollToProducts}>
                Browse Catalog
            </button>
            </div>
            <div className="home-img">
                <img src={homeBg} alt="home-bg" />
            </div>
        </section>
    )
}

export default Home