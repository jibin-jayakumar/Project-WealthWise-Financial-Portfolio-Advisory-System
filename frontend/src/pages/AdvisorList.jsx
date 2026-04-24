import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import '../App.css';


function AdvisorList() {
    const [advisors, setAdvisors] = useState([]);
    const [message, setMessage] = useState('');
    const [hiredAdvisorId, setHiredAdvisorId] = useState(null);
    const navigate = useNavigate();
    const userType = localStorage.getItem('user_type');
    console.log('Logged in as:', userType);

    useEffect(() => {
        loadAdvisors();
        checkHiredAdvisor();
    }, []);

    const loadAdvisors = async () => {
        const res = await API.get('advisors/');
        setAdvisors(res.data);
    };


    const checkHiredAdvisor = async () => {
        try {
            const res = await API.get('my-advisor/');
            if (res.data.advisor) {
                setHiredAdvisorId(res.data.advisor);
            } else {
                setHiredAdvisorId(null);
            }
        } catch (err) {
            setHiredAdvisorId(null);
        }
    };

    const hireAdvisor = async (advisorId, advisorName) => {
        if (hiredAdvisorId) {
            setMessage('You already have an advisor. Release your current advisor first to hire a new one.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }



        console.log('Sending hire request for advisor_id:', advisorId);
        try {
            const response = await API.post('hire/', { advisor_id: advisorId });
            console.log('Response:', response.data);
            setMessage(`Hired ${advisorName}!`);
            await checkHiredAdvisor();  // Refresh hired advisor after successful hire
            setTimeout(() => setMessage(''), 2000);
        } catch (err) {
            console.error('Error response:', err.response?.data);
            const errorMsg = err.response?.data?.error || 'Failed to hire';
            setMessage(errorMsg);
            // Refresh hired advisor status in case backend changed something
            await checkHiredAdvisor();
            setTimeout(() => setMessage(''), 3000);
        }
    };


    return (
        <div>
            <nav className="nav5 w-100">
                <div className="advisor-container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                        <h2 className="text-pri">Available Advisors</h2>
                        <button className="nav-link btn btn-link text-black" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'}
    onMouseLeave={(e) => e.target.style.opacity = '1'} onClick={() => navigate('/dashboard')} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    </div>
                </div>
            </nav>

            {message && <div className="alert alert-success text-center py-2">{message}</div>}

            <div className="row">
                {advisors.map(adv => (
                    <div className="advisor-card" key={adv.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>

                        <h3 className="advisor-name">{adv.name}</h3>
                        <p> <strong>Expertise: </strong> {adv.expertise}</p>
                        <p><strong>Bio: </strong>{adv.bio}</p>
                        <p><strong>Experience: </strong> {adv.years_of_experience} years</p>
                        <p><strong>Qualification: </strong> {adv.qualification}</p>
                        {hiredAdvisorId === adv.id ? (
                            <button className="btn-hire-disabled" disabled style={{ backgroundColor: '#ccc', padding: '8px 16px', border: 'none', borderRadius: '5px' }}>Already Hired</button>
                        ) : (
                            <button className="btn-hire" onClick={() => hireAdvisor(adv.id, adv.name)} style={{ backgroundColor: '#1a44a8', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Hire</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdvisorList;