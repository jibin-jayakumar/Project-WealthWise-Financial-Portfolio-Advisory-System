import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../App.css';

function Dashboard() {
    const [investments, setInvestments] = useState([]);
    const [total, setTotal] = useState(0);
    const [risk, setRisk] = useState('');
    const [warnings, setWarnings] = useState([]);
    const [composition, setComposition] = useState({});
    const [myAdvisor, setMyAdvisor] = useState(null);
    const user_type = localStorage.getItem('user_type');
    const navigate = useNavigate();

    const pieData = [
        { name: 'Stocks', value: composition.stocks || 0 },
        { name: 'Crypto', value: composition.crypto || 0 },
        { name: 'Commodities', value: composition.commodities || 0 },
    ];

    const COLORS = ['#1f213a', '#df2938', '#e28c47'];

    useEffect(() => {
        loaderData();
        loadMyAdvisor();
    }, []);

    const loaderData = async () => {
        const res = await API.get('investments/');
        setInvestments(res.data.investments);
        setTotal(res.data.total_value);
        setRisk(res.data.risk_level);
        setWarnings(res.data.warnings || []);
        setComposition(res.data.composition || {});
    };

    const loadMyAdvisor = async () => {
        try {
            const res = await API.get('my-advisor/');
            setMyAdvisor(res.data.advisor_name);
        } catch {
            setMyAdvisor(null);
        }
    };

    const simulateMarket = async () => {
        await API.post('investments/simulate/');
        loaderData();
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };


    const deleteInvestment = async (id) => {
        if (window.confirm('Are you sure you want to delete this investment?')) {
            try {
                await API.delete(`investments/delete/${id}/`);
                loaderData();
            } catch (err) {
                console.error('Delete failed:', err);
            }
        }
    };

    return (
        <div className="container-fluid px-0">
            <div style={{ backgroundColor: '#f7ebcb', padding: '10px', margin: 0 }}>
                <h1 style={{ color: '#29082c', margin: 0, fontSize: '38px', marginLeft: '2px' }}>WealthWise</h1>
                <p className="p2" style={{ marginLeft: '12px', fontStyle: 'italic' }}>Professional advice, better returns</p>
            </div>

            <nav className="navbar navbar-expand-lg dashboard-navbar">

                <div className="container-fluid">
                    <span className="navbar-brand">Portfolio Overview</span>

                    {/* Hamburger button - add this */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible wrapper - add this */}
                    <div className="collapse navbar-collapse" id="dashboardNavbar">
                        <div className="navbar-nav ms-auto">
                            <button style={{ fontWeight: 'bolder' }} className="nav-link btn btn-link text-white" onClick={() => navigate('/')}>Home</button>
                            <button className="nav-link btn btn-link text-white" onClick={() => navigate('/profile')}>My Profile</button>
                            <button className="nav-link btn btn-link text-white" onClick={() => navigate('/add-investment')}>Add Investment</button>
                            <button className="nav-link btn btn-link text-white" onClick={simulateMarket}>Simulate Market</button>

                            {user_type === 'investor' && (
                                <>
                                    <button className="nav-link btn btn-link text-white" onClick={() => navigate('/advisors')}>Find Advisors</button>
                                    <button className="nav-link btn btn-link text-white" onClick={() => navigate('/recommendations')}>Recommendations</button>
                                    <button className="nav-link btn btn-link text-white" onClick={logout}>Logout</button>
                                </>
                            )}
                            {user_type === 'advisor' && (
                                <button className="nav-link btn btn-link text-white" onClick={() => navigate('/recommendations')}>Give Recommendations</button>
                            )}

                            {user_type === 'advisor' && (
                                <>
                                    <button className="nav-link btn btn-link text-white" onClick={() => navigate('/clients')}>View My Clients</button>
                                    <button className="nav-link btn btn-link text-white" onClick={logout}>Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>




            {myAdvisor && (
                <div style={{ backgroundColor: '#dde9ea', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
                    <h4 >Your Financial Advisor: {myAdvisor}</h4>
                </div>
            )}

            <div style={{ padding: '20px' }}>
                {/* <div className="row mb-4">
                <div className="col-md-6">
                    <div className="cardtext-whitebg">
                        <div className="card-body">

            <h5 className="card-title">Total Value</h5>
            <h3 className="card-text">₹{total}</h3>
     </div>
        </div>
        </div>
        </div> 
        <div className="col-md-6">
            <div className="cardtext-whitebg-warning">
                <div className="card-body">

            <h5 className="card-title">Risk Level</h5>
            <h3 className="card-text">{risk}</h3>

            </div>
       </div>
       </div>
       </div> */}

                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="cardtext-whitebg">
                            <div className="card-body">
                                <h5 className="card-title">Total Value</h5>
                                <h3 className="card-text">₹{total}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="cardtext-whitebg-warning">
                            <div className="card-body">
                                <h5 className="card-title">Risk Level</h5>
                                <h3 className="card-text">{risk}</h3>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Displaying warning */}
                {warnings.length > 0 && (
                    <div className="alert-warning">
                        <h4>Warnings:</h4>
                        <ul>
                            {warnings.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                )}

                <div className="box1">
                    <h4>Portfolio Composition:</h4>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <ul className="list-group">
                                <li className="list-group-item">Stocks: {composition.stocks || 0}%</li>
                                <li className="list-group-item">Crypto: {composition.crypto || 0}%</li>
                                <li className="list-group-item">Commodities: {composition.commodities || 0}%</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <PieChart width={500} height={350}>
                                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>

                <div className="box2">
                    <h4 className="mt-4">Your Investments:</h4>
                    <div className="investments-list">
                        <ul className="investment-items">
                            {investments.map(inv => (
                                <li key={inv.id} className="investment-item">
                                    <span className="investment-details">
                                        {inv.name} - {inv.quantity} shares @ ₹{inv.buy_price}
                                        {inv.current_price && (
                                            <span className="investment-pl"> | Current: ₹{inv.current_price}|
                                                P/L: ₹{((inv.current_price - inv.buy_price) * inv.quantity).toFixed(2)}
                                            </span>
                                        )}
                                    </span>
                                    <div className="investment-actions">
                                        <button className="btn btn-primary w-20" onClick={() => navigate(`/update-investment/${inv.id}`)} style={{ marginLeft: '10px' }}>Edit</button>
                                        <button className="btn btn-danger w-20" onClick={() => deleteInvestment(inv.id)} style={{ marginLeft: '5px', backgroundColor: 'red', color: 'white' }}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div style={{ marginLeft: '550px' }} className="simu2">
                    <button className='btn-primary1' onClick={simulateMarket}>Simulate Market</button>
                </div> */}
                <div className="simu2 text-center mt-3">
                    <button className='btn-primary1' onClick={simulateMarket}>Simulate Market</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;