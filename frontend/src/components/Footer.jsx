// import React from 'react';

// function Footer() {
//     return (
//         <footer className="bg-dark text-white text-center py-3 mt-5">
//             <div className="container">
//                 <p className="mb-0">&copy; 2026 WealthWise. All rights reserved.</p>
//             </div>
//         </footer>
//     );
// }

// export default Footer;


import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-5">
            <div className="row" style={{ margin: 0, paddingLeft: '20px', paddingRight: '20px' }}>
                <div className="col-md-4 mb-4 text-start">
                    <h5 className="mb-3" style={{ color: '#f7ebcb' }}>WealthWise</h5>
                    <p style={{ fontSize: '14px', color: '#ccc' }}>
                        Smart investing platform that helps you track investments,</p><p style={{ fontSize: '14px', color: '#ccc' }}> analyze risk, 
                        and connect with expert financial advisors.
                    </p>
                </div>
                
                <div className="col-md-2 mb-4 text-start">
                    <h5 className="mb-3" style={{ color: '#f7ebcb' }}>Quick Links</h5>
                    <ul className="list-unstyled" style={{ fontSize: '14px' }}>
                        <li className="mb-2"><a href="#" onClick={() => navigate('/')} style={{ color: '#ccc', textDecoration: 'none' }}>Home</a></li>
                        <li className="mb-2"><a href="#" onClick={() => navigate('/dashboard')} style={{ color: '#ccc', textDecoration: 'none' }}>Dashboard</a></li>
                        <li className="mb-2"><a href="#" onClick={() => navigate('/advisors')} style={{ color: '#ccc', textDecoration: 'none' }}>Find Advisors</a></li>
                    </ul>
                </div>
                
                <div className="col-md-3 mb-4 text-start">
                    <h5 className="mb-3" style={{ color: '#f7ebcb' }}>Support</h5>
                    <ul className="list-unstyled" style={{ fontSize: '14px' }}>
                        <li className="mb-2"><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>FAQ</a></li>
                        <li className="mb-2"><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Us</a></li>
                        <li className="mb-2"><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy Policy</a></li>
                    </ul>
                </div>
                
                <div className="col-md-3 mb-4 text-start">
                    <h5 className="mb-3" style={{ color: '#f7ebcb' }}>Contact</h5>
                    <ul className="list-unstyled" style={{ fontSize: '14px', color: '#ccc' }}>
                        <li className="mb-2">support@wealthwise.com</li>
                        <li className="mb-2">+1 234 567 890</li>
                    </ul>
                </div>
            </div>
            
            <hr className="bg-secondary" style={{ margin: '10px 20px' }} />
            
            <div className="text-center">
                <p className="mb-0" style={{ fontSize: '12px', color: '#888' }}>
                    &copy; 2026 WealthWise. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;