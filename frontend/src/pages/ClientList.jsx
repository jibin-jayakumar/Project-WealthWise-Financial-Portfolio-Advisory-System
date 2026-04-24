import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';


function ClientsList() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const res = await API.get('my-clients/');
            setClients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const viewPortfolio = async (investorId, investorName) => {
        try {
            const res = await API.get(`client-portfolio/${investorId}/`);
            setPortfolio({ ...res.data, investor_name: investorName });
            setSelectedClient(investorId);
        } catch (err) {
            console.error(err);
        }
    };

   return (
        <div className="advisor-container">
            <nav className="nav5 w-100">
                <div className="advisor-container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                        <h2 className="text-pri">My Clients</h2>
                        <button className="nav-link btn btn-link text-black"  style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'}
    onMouseLeave={(e) => e.target.style.opacity = '1'}onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    </div>
                </div>
            </nav>

            <div className="advisor-card11">
                {clients.length === 0 ? (
                    <p className="text-center">No clients yet. Investors will appear here when they hire you.</p>
                ) : (
                    clients.map(client => (
                        <div key={client.investor_id} className="advisor-card" style={{ marginBottom: '15px' }}>
                            <h3 className="advisor-name">{client.investor_name}</h3>
                            <p><strong>Email:</strong> {client.investor_email}</p>
                            <p><strong>Hired Date:</strong> {new Date(client.hired_date).toLocaleDateString()}</p>
                            <button className="btn btn-primary" onClick={() => viewPortfolio(client.investor_id, client.investor_name)}>
                                View Portfolio
                            </button>
                        </div>
                    ))
                )}
            </div>

            {portfolio && (
                <div className="advisor-card" style={{ marginTop: '20px' }}>
                    <h3 className="advisor-name">Portfolio of {portfolio.investor_name}</h3>
                    <p><strong>Total Value:</strong> ₹{portfolio.total_value || 0}</p>
                    <h4>Investments:</h4>
                    {portfolio.investments?.length === 0 ? (
                        <p>No investments yet.</p>
                    ) : (
                        <ul className="investment-items">
                            {portfolio.investments?.map(inv => (
                                <li key={inv.id} className="investment-item">
                                    <strong>{inv.name}</strong> - {inv.quantity} shares @ ₹{inv.buy_price}
                                    {inv.current_price && (
                                        <span className="investment-pl">
                                            | Current: ₹{inv.current_price} |
                                            P/L: ₹{((inv.current_price - inv.buy_price) * inv.quantity).toFixed(2)}
                                            {((inv.current_price - inv.buy_price) * inv.quantity) >= 0 ? ' ▲' : ' ▼'}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default ClientsList;