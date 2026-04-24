import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import '../App.css';


function Recommendations() {
    const [recs, setRecs] = useState([]);
    const [message, setMessage] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();
    const userType = localStorage.getItem('user_type');

    console.log('Component loaded - userType:', userType);  // DEBUG

    useEffect(() => {
        console.log('useEffect triggered');  // DEBUG
        loadData();
    }, []);

    const loadData = async () => {
        console.log('loadData started - userType:', userType);  // DEBUG
        try {
            const res = await API.get('recommendations/');
            console.log('Recommendations response:', res.data);  // DEBUG
            setRecs(res.data);
            
            if (userType === 'advisor') {
                console.log('Fetching my-clients...');  // DEBUG
                const clientsRes = await API.get('my-clients/');
                console.log('Clients response:', clientsRes.data);  // DEBUG
                setClients(clientsRes.data);
            } else {
                console.log('userType is not advisor, skipping my-clients');  // DEBUG
            }
        } catch (err) {
            console.error('loadData error:', err);  // DEBUG
        }
    };

    const sendRec = async () => {
        console.log('sendRec called - selectedClient:', selectedClient, 'newMessage:', newMessage);  // DEBUG
        if (!selectedClient || !newMessage) return;
        try {
            await API.post('recommendations/give/', { investor_id: selectedClient, message: newMessage });
            console.log('Recommendation sent successfully');  // DEBUG
            setMessage('Sent!')
            setNewMessage('');
            loadData();
            setTimeout(() => setMessage(''), 2000);
        } catch (err) {
            console.error('sendRec error:', err);  // DEBUG
            setMessage('Failed to send');
        }
    };

      return (
        <div className="advisor-container">
            <nav className="nav5 w-100">
                <div className="advisor-container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                        <h2 className="text-pri">{userType === 'advisor' ? 'Give Advice' : 'My Advice'}</h2>
                        <button  className="nav-link btn btn-link text-black"  style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'}
    onMouseLeave={(e) => e.target.style.opacity = '1'}  onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    </div>
                </div>
            </nav>

            <div className="advisor-card11">
                {message && <div className="alert alert-success text-center py-2">{message}</div>}

                {userType === 'advisor' ? (
                    <div>
                        <div className="mb-3">
                            <label className="form-label">Select Client:</label>
                            <select className="form-select" onChange={(e) => setSelectedClient(e.target.value)}>
                                <option value="">Select Client</option>
                                {clients.map(c => (
                                    <option key={c.investor_id} value={c.investor_id}>{c.investor_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Your Advice:</label>
                            <textarea className="form-control" rows="3" cols="40" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Your advice..." />
                        </div>
                        <button className="btn btn-primary w-100" onClick={sendRec}>Send Advice</button>
                    </div>
                ) : (
                    <div>
                        {recs.length === 0 ? (
                            <p className="text-center">No advice yet.</p>
                        ) : (
                            recs.map(r => (
                                <div key={r.id} className="advisor-card" style={{ marginBottom: '10px' }}>
                                    <p><strong>From {r.advisor_name}:</strong></p>
                                    <p>{r.message}</p>
                                    <small className="text-muted">{new Date(r.created_date).toLocaleString()}</small>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Recommendations;