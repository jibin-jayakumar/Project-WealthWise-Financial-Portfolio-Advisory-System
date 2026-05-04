// import axios from "axios";

// const API = axios.create({
//     baseURL: '/api/',
// });

// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     console.log('Token being sent:', token);
//     if (token) {
//         config.headers.Authorization = `Token ${token}`;
//     }
//     return config;
// });

// export default API;


import axios from "axios";

const API = axios.create({
    baseURL: 'https://project-wealthwise-financial-portfolio.onrender.com',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
});

export default API;