import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';

import { Context } from '../../Context/AuthContext';

import './styles.css';

import home from '../../assets/home.png';

export default function Login() {
  const { login } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

   login(email, password);
  }

  return (
    <div className="login-container">
      <img src={home} alt="DebtPlay"/>
      <section className="form">
        <div className="header">
            <span>Não tem uma conta?</span>
            <Link className="button" to="/register">Crie uma</Link>
        </div>
        
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div>
            <BiEnvelope className="icon-login" size={20} />
            <input 
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <BiLockAlt className="icon-login" size={20} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="button-login">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </section>
    </div>
  );
}