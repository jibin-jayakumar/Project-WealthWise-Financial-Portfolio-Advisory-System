import React from 'react';

function Carousel() {
    return (
        <div>

                <div className="hero-section " >
    <h1 className="display-4 fw-bold" style={{ color: '#1a2a4f' }}>
        Smart Investing at Your Fingertips
    </h1>
    <p className="lead mb-3" style={{ fontSize: '1.2rem', color: '#555' }}>
        Your trusted partner for smart investing
    </p>
    <div className="d-flex justify-content-start gap-3 mb-4 flex-wrap">
        <span className="badge bg-primary p-2">Portfolio Tracking</span>
        <span className="badge bg-success p-2">Risk Analysis</span>
        <span className="badge bg-info p-2">Advisor Support</span>
    </div>
    <p style={{ maxWidth: '700px', color: '#666' }}>
        Track investments, analyze risk, and get expert advice — all in one place.
    </p>
</div>



            <section className="crosl">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/static/fina1.jpg.jpg" className="d-block w-100" alt="Smart Investing" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Smart Investing</h5>
                                <p>Track your portfolio with real-time updates</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/static/fina2.jpg" className="d-block w-100" alt="Expert Advisors" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Expert Advisors</h5>
                                <p>Get professional guidance for better returns</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/static/fina3.jpg" className="d-block w-100" alt="Grow Your Wealth" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Grow Your Wealth</h5>
                                <p>Analyze risk and make informed decisions</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>


            <section className="about-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
    <div className="about-container">
        <h2 className="display-5 fw-bold mb-4 text-start" style={{ color: '#1a2a4f' }}>About WealthWise</h2>
        <p className="lead text-start" style={{ color: '#555', maxWidth: '800px', lineHeight: '1.8' }}>
            WealthWise is a comprehensive financial platform that helps you track your investments, 
            analyze portfolio risk, and connect with expert financial advisors. Whether you're new to investing 
            or an experienced trader, our platform provides the tools and insights you need to make informed 
            financial decisions and grow your wealth.
        </p>
        <p className="text-start" style={{ color: '#666', maxWidth: '800px', lineHeight: '1.8' }}>
            Our mission is to simplify investing by combining powerful analytics with personalized advisor support, 
            making professional financial guidance accessible to everyone.
        </p>
    </div>
</section>



 </div>
        
        


    );
}

export default Carousel;