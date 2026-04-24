import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import '../App.css';

function Register(){
    const [form, setForm] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange =(e)=>{
       setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleRegister =async (e)=>{
        e.preventDefault();
        if (form.password !== form.confirm_password){
            setError('Password do not match');
            return;
        }
        try{
            localStorage.removeItem('token')
            const dataToSend ={
                ...form,
                age: parseInt(form.age)
            };

            const endpoint = form.role === 'advisor' ? 'register/advisor/' : 'register/investor/';
            await API.post(endpoint, dataToSend);
            navigate('/login');
        }catch{
            setError('Registration failed');
        }
    };

    const isAdvisor = form.role === 'advisor'

    return(
        <div className="register-page">
        <div className="container mt-4">
            <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="card shadow">
                    <div className="card-body">
            <h2 className="text_center mb-4">Register</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <form onSubmit={handleRegister}>
             

                <div className="mb-3">
                <label className="form-label">Role:</label>
                <select name='role' className="form-select" value={form.role || 'investor'} onChange={handleChange}>
                    <option value="investor">Investor</option>
                    <option value="advisor">Financial Advisor</option>
                </select>
                </div>
            
                {/* common fields */}
                <div className="mb-3">
                <label className="form-label">Username: </label>
                <input name='username' className="form-control" placeholder="Username" onChange={handleChange}/><br/>
                </div>

                <div className="mb-3">
                <label className="form-label">First Name: </label>
                <input name='first_name' className="form-control" placeholder="First Name" onChange={handleChange}/>
                </div>

                <div className="mb-3">
                 <label className="form-label">Last Name: </label>
                <input name='last_name' className="form-control" placeholder="Last Name" onChange={handleChange}/><br/>
                </div>

                <div className="mb-3">
                <label className="form-label">Age: </label>
                <input name='age' className="form-control" type="number" placeholder="Age" onChange={handleChange}/><br/>
                </div>

                <div className="mb-3">
                <label className="form-label">Email: </label>
                <input name='email' className="form-control" placeholder="Email" onChange={handleChange}/><br/>
                </div>

                <div className="mb-3">
                <label className="form-label">Phone: </label>
                <input name='phone_number' className="form-control" placeholder="Phone" onChange={handleChange}/><br/>
                </div>

                <div className="mb-3">
                <label className="form-label">Password: </label>
                <input name='password' className="form-control" type="password" placeholder="Password" onChange={handleChange}/><br/>
                </div>

                <div className="mb-3">
                <label className="form-label">Confirm Password: </label>
                <input name='confirm_password' className="form-control" type="password" placeholder="Confirm Password" onChange={handleChange}/><br/>                 
                </div>
              
                {/* for advisor  */}

                {isAdvisor && (
                    <>
                    <div className="mb-3">
                        <label className="form-label">Expertise:</label>
                        <input name='expertise' className="form-control" placeholder="e.g.,stocks, crypto, Mutual Funds" onChange={handleChange} required/><br/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label"> Years of Expertise:</label>
                        <input name="years_of_experience" className="form-control" type="number" placeholder="Years" onChange={handleChange} required/><br/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Bio: </label>
                        <textarea name='bio' className="form-control" placeholder="Tell about yourself" rows="3" cols="30" onChange={handleChange} required/><br/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Qualification:</label>
                        <input name='qualification' className="form-control" placeholder="e.g, MBA, CFA" onChange={handleChange} required /><br/>
                   </div>

                </>
                )}

                <button type="submit" className="btn btn-primary w-100">Register</button>           
           
            </form>

            <div className="text-center mt-3">
            <a href="/login">Back to login</a>
            </div>

        </div>
      </div>
      </div> 
      </div>
     </div>
     </div>
    );
}

export default Register;
