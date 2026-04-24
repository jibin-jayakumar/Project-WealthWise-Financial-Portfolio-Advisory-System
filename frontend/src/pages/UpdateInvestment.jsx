import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

function UpdateInvestment() {
    const { id } = useParams();
    const [form, setForm] = useState({ quantity: '', buy_price: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadInvestment();
    }, []);

    const loadInvestment = async () => {
        try {
            const res = await API.get('investments/');
            const investment = res.data.investments.find(inv => inv.id === parseInt(id));
            if (investment) {
                setForm({
                    quantity: investment.quantity,
                    buy_price: investment.buy_price
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`investments/update/${id}/`, {
                quantity: parseFloat(form.quantity),
                buy_price: parseFloat(form.buy_price)
            });
            setSuccess('Investment updated successfully!');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setError('Update failed');
        }
    };

    return (
        <div>
            <h2>Update Investment</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Quantity: </label>
                <input name="quantity" type="number" step="any" value={form.quantity} onChange={handleChange} required /><br/>
                <label>Buy Price: </label>
                <input name="buy_price" type="number" step="any" value={form.buy_price} onChange={handleChange} required /><br/>
                <button type="submit">Update</button>
            </form>
            <button onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
    );
}

export default UpdateInvestment;