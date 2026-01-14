import api from './index.js';

export const registerApi = async (userData)=>{
    return api.post('/auth/register', userData);
}

export const loginApi = async (loginData)=>{
    return api.post('/auth/login', loginData);
}

