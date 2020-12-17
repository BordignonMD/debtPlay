import { useState, useEffect } from 'react';

import api from '../../services/api';

import history from '../../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function login(email, password) {
    try {
        const response = await api.post('login', { email, password });
  
        localStorage.setItem('token', JSON.stringify(response.data.token))

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        setAuthenticated(true);

        history.push('/home');
        
    } catch (err) {
        console.log(err)
        alert('Falha no login, tente novamente');
    }
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }
  
  return { authenticated, loading, login, logout };
}