import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
    const navigate = useNavigate();
    const isAuth = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className='nav1'>
            <h1 className='title1'>WealthWise</h1>
            <p style={{marginLeft:'25px'}}>Professional advice, better returns</p>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    Platform Features
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a>
                        </li>
                        {!isAuth ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Register</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    );
}

export default Navbar;

