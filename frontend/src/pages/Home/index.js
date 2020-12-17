import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiPlus, BiTrash, BiListCheck, BiMenu } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";

import api from '../../services/api';
import history from '../../history';
import { Context } from '../../Context/AuthContext';

import "./styles.css";

export default function Profile() {
  
  const { logout } = useContext(Context);
  
  const [debtClient, setDebtClient] = useState([]);

  useEffect(() => {
    api.get('home').then(response => {
      setDebtClient(response.data)
    })
  }, [])

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  async function handleToList(client_id, client_name) {
    localStorage.setItem('clientId', client_id);
    localStorage.setItem('clientName', client_name);

    history.push('/debt/list');
  }

  async function handleToAdd(client_id, client_name){
    localStorage.setItem('clientId', client_id)
    localStorage.setItem('clientName', client_name)

    history.push('/debt/add');
  }

  async function handleDeleteDebts(client_id) {
    try {
      await api.delete(`debt/client/${client_id}`)
      
      setDebtClient(debtClient.filter(debt => debt.id_client !== client_id))
    } catch (err) {
      alert('Erro ao deletar dívidas, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();
    logout();
  }

  return (
    <div className="profile-container">
      <header className="Header">
        <h1 className="logo">DebtPlay</h1>

        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <nav className="Nav">
            <Link className="button-menu" to="/debt/add">
                {" "}
                Nova dívida{" "}
            </Link>
            <button className="button-menu" onClick={handleLogout} type="button">
                {" "}
                Sair{" "}
            </button>
          </nav>
        </CSSTransition>
        <button onClick={toggleNav} className="Burger">
          <BiMenu size={20} />
        </button>
      </header>
      <main>
        <h1> Clientes com Dívidas </h1>
        <ul>
          {debtClient.map(index => (
            <li key={index.id_client} >
              <div className="info" onClick={() => handleToList(index.id_client, index.name_client)}>
                <strong> CLIENTE: </strong>
                <p> {index.name_client} </p>
        
                <strong> DÍVIDA TOTAL: </strong>
                <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(index.debt_total)} </p>
              </div>
              <div className="buttons">
                <button className="link-button" onClick={() => handleDeleteDebts(index.id_client)}>
                  <BiTrash size={20} color="darksalmon" />
                </button>

                <button className="link-button" onClick={() => handleToAdd(index.id_client, index.name_client)}>
                <BiPlus size={20} color="darksalmon" />
                </button>

                <button className="link-button" onClick={() => handleToList(index.id_client, index.name_client)}>
                  <BiListCheck size={20} color="darksalmon" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
