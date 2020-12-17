import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiTrash, BiEdit } from "react-icons/bi";

import api from '../../services/api';
import history from '../../history';

import "./styles.css";

export default function ListDebt() {
  const [debtClient, setDebtClient] = useState([]);

  const clientId = localStorage.getItem('clientId')
  const clientName = localStorage.getItem('clientName')

  useEffect(() => {
    api.get(`debt/client/${clientId}`).then(response => {
      setDebtClient(response.data)
    })
  }, [clientId])

  async function handleDeleteDebt(debt_id) {
    try {
      await api.delete(`debt/${debt_id}`)
      
      setDebtClient(debtClient.filter(debt => debt.id_debt !== debt_id))
    } catch (err) {
      alert('Erro ao deletar dívida, tente novamente.')
    }
  }

  function handleToUpdate(debt_id) {
    localStorage.setItem('debtId', debt_id)

    history.push('/debt/update')
  }

  return (
    <div className="listDebt-container">
      <header>
        <h1>DebtPlay</h1>
        <Link className="button" to="/home">
          Voltar
        </Link>
      </header>
      <main>
        <h1> Dívidas do(a) cliente {clientName}</h1>
        <ul>
          {debtClient.map(index => (
            <li key={index.id_client} >
              <div className="info" onClick={() => handleToUpdate(index.id_debt)}>
                <strong> IDENTIFICADOR DÍVIDA: </strong>
                <p> {index.id_debt} </p>
        
                <strong> MOTIVO: </strong>
                <p> {index.reason}</p>

                <strong> VALOR: </strong>
                <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(index.value)} </p>

                <strong> DATA: </strong>
                <p> {new Date(index.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>

                <strong> USUÁRIO DE CADASTRO</strong>
                <p> {index.name_user}</p>
              </div>
              <div className="buttons">
                <button className="link-button" onClick={() => handleDeleteDebt(index.id_debt)}>
                  <BiTrash size={20} color="darksalmon" />
                </button>
                <button className="link-button" onClick={() => handleToUpdate(index.id_debt)}>
                  <BiEdit size={20} color="darksalmon" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
