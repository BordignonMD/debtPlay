import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiEnvelope, BiLockAlt } from 'react-icons/bi'

import api from '../../services/api';
import history from '../../history';
import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handlerRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password
    };

    try {
      await api.post('user', data);

      alert('Cadastro efetuado com sucesso!');

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="left">
        <h1>Bem vindo de volta</h1>
        <p>Para se manter conectado, faça login com suas informações pessoais</p>
        <Link className="button" to="/">Voltar</Link>
      </div>
      
      <section className="form">
        <h1>Criar conta</h1>
        <form onSubmit={handlerRegister}>
          <div>
            <BiUser className="icon-register" size={20} />
            <input 
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <BiEnvelope className="icon-register" size={20} />
            <input 
              type="email" 
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <BiLockAlt className="icon-register" size={20} />
            <input 
              placeholder="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </section>
    </div>
  );
}