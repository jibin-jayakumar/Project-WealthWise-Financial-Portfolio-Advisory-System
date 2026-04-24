import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

function AddInvestment() {
    const [form, setForm] = useState({
        type: 'stock',
        name: '',
        quantity: '',
        buy_price: ''
    })
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('investments/add/', {
                type: form.type,
                name: form.name,
                quantity: parseFloat(form.quantity),
                buy_price: parseFloat(form.buy_price)
            });
            setSuccess('Investment added successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            setError('Failed to add investment');
            console.error(err);
        }
    };

    return (
        <div className="advisor-container">
            <nav className="nav5 w-100">
                <div className="advisor-container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                        <h2 className="text-pri">Add Investment</h2>
                        <button className="nav-link btn btn-link text-black" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'}
    onMouseLeave={(e) => e.target.style.opacity = '1'} onClick={() => navigate('/dashboard')} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    </div>
                </div>
            </nav>

            <div className="advisor-card11">
                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Type:</label>
                        <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                            <option value="stock">Stock</option>
                            <option value="crypto">Cryptocurrency</option>
                            <option value="commodity">Commodity</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input name="name" className="form-control" placeholder="Name e.g., Tesla, Bitcoin, Gold" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input name="quantity" type="number" step="any" className="form-control" placeholder={form.type === 'commodity' ? 'Weight (grams)' : 'Quantity'} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Buy price:</label>
                        <input name="buy_price" type="number" step="any" className="form-control" placeholder="Buy price (₹)" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Investment</button>
                </form>
            </div>
        </div>
    );
}

export default AddInvestment;