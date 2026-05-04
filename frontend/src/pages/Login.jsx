import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import '../App.css';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    const handlelogin = async (e) => {
        e.preventDefault();
         console.log('1. Login started for:', username);

        try{
            // localStorage.removeItem('token');
            // console.log('2. Token removed');

            const res = await API.post('login/',{username, password});
            console.log('3. API response:', res.data);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_type',res.data.user_type);
            console.log('4. Token saved:', localStorage.getItem('token'));
            console.log('5. User type saved:', localStorage.getItem('user_type'));

            console.log('6. About to navigate to dashboard');
            navigate('/dashboard');
            console.log('7. Navigate called');
        } catch (err){
            console.error('Login error:', err);
            setError('Login failed');
        }
    };
    return(
        <div className="container mt-5">
            <div className="login-card">
                <button 
    className="nav-link btn btn-link text-black"  
    style={{ 
        transition: 'all 0.3s ease',
        marginLeft: 'auto',
        marginbottom: '50px'
    
    }} 
    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
    onMouseLeave={(e) => e.target.style.opacity = '1'} 
    onClick={() => navigate('/')}
>
    Home
</button>
            <h2 className="text_center mb-4">Login</h2>
            {error && <p className="text-danger text-center" style={{color:'red'}}>{error}</p>}
            <form onSubmit={handlelogin}>
                <div className="mb-3">
                <label>Username: </label>
                <input type="text" className="form-control" placeholder="Username" value={username} 
                onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Password: </label>
                <input type="password" className="form-control" placeholder="password" value={password} 
                onChange={(e)=> setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="text-center mt-3">
            <a href="/register">Create Account</a>
        </div>
        
        </div>
       </div>
       
    );
}

export default Login;