import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myAdvisor, setMyAdvisor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadProfile();
        loadMyAdvisor();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await API.get('user/profile/');
            setUser(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadMyAdvisor = async () => {
        try {
            const res = await API.get('my-advisor/');
            if (res.data && res.data.advisor_name) {
                setMyAdvisor(res.data.advisor_name);
            } else {
                setMyAdvisor(null);
            }
        } catch (err) {
            setMyAdvisor(null);
        }
    };

    const releaseAdvisor = async () => {
        if (window.confirm('Are you sure you want to release your financial advisor?')) {
            try {
                await API.delete('release/');
                setMyAdvisor(null);
                alert('Advisor released successfully');
                // Refresh to update dashboard
                window.location.reload();
            } catch (err) {
                console.error(err);
                alert(err.response?.data?.error || 'Failed to release advisor');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (

        <div className="advisor-container">
      <nav className="nav5 w-100" style={{ margin: 0, padding: '10px 0', width: '100%' ,marginLeft:'-20px', }}>
                <div className="advisor-container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom"></div>
                        <h2 className="text-pri">My Profile</h2>

                        <button className="nav-link btn btn-link text-black"  style={{ transition: 'all 0.3s ease', marginLeft: 'auto'}} 
    onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'} 
    onClick={() => navigate('/dashboard')}
>
    Back to Dashboard
</button>
            
            
            </div>
            </nav>

            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '10px' }}>
                <div className="advisor-card">
                <h3 className="advisor-name">Personal Information</h3>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Phone:</strong> {user.phone_number}</p>
                <p><strong>Role:</strong> {user.user_type === 'investor' ? 'Investor' : 'Financial Advisor'}</p>
            </div>

            {/* My Financial Advisor Section - for Investors only */}
            {user.user_type === 'investor' && (
                <div className="advisor-card">
                    <h3 className="advisor-name">My Financial Advisor</h3>
                    {myAdvisor ? (
                        <div>
                            <p><strong>Advisor:</strong> {myAdvisor}</p>
                            <button className="btn btn-danger"  onClick={releaseAdvisor}>Release Advisor</button>
                        </div>
                    ) : (
                        <p>No advisor hired yet. <a href="/advisors">Find an advisor</a></p>
                    )}
                </div>
            )}

            {user.user_type === 'advisor' && (
                <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '10px' }}>
                    <h3 className="advisor-name">Professional Information</h3>
                    <p><strong>Expertise:</strong> {user.expertise}</p>
                    <p><strong>Experience:</strong> {user.years_of_experience} years</p>
                    <p><strong>Bio:</strong> {user.bio}</p>
                    <p><strong>Qualification:</strong> {user.qualification}</p>
                </div>
            )}
        </div>
        </div>
    );
}

export default Profile;