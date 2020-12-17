import React, { useState, useEffect } from "react";
import { BiUser, BiDetail, BiCalendar } from "react-icons/bi";

import api from '../../services/api';
import history from '../../history';

import "./styles.css";

export default function UpdateDebt() {
  const [name_client, setName_client] = useState("");
  const [reason, setReason] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");

  const debtId = localStorage.getItem('debtId');
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    api.get(`debt/${debtId}`).then(response => {
      setName_client(response.data.name_client)
      setReason(response.data.reason)
      setValue(response.data.value)
      setDate(response.data.date)
    })
  }, [debtId])

  function returnToList(){
    localStorage.removeItem('debtId');

    history.push('/debt/list');
  }

  async function handleUpdateDebt(e) {
    e.preventDefault();

    const data = {
      reason,
      value,
      date,
    };

    try {
     await api.put(`debt/${debtId}`, data, {
        headers: {
          id_user: userId,
        }});

      alert('Divida alterada com sucesso!');

      returnToList();
    } catch (err) {
      alert('Erro na adição da dívida, tente novamente');
    }
  }

  return (
    <div className="updateDebt-container">
      <header>
        <h1>DebtPlay</h1>
        <button className="button" onClick={() => returnToList()}>Voltar</button>
      </header>
      
      <section className="form">
        <h1> Alteração de Dívida </h1>
        <form onSubmit={handleUpdateDebt}>
          <label> Cliente </label>
          <div class="icon-input">
            <BiUser className="icon-updatedebt" size={20} />
            <input type="text" value={name_client} disabled />
          </div>

          <label> Motivo </label>
          <div class="icon-input">
            <BiDetail className="icon-textarea" size={20} />
            <textarea placeholder="Motivo" value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>

          <label> Valor </label>
          <div class="icon-input">
            <strong className="icon-adddebt">R$</strong>
            <input  type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>

          <label> Data </label>
          <div class="icon-input">
            <BiCalendar className="icon-adddebt" size={20} />
            <input placeholder="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>

          <div className="button-container">
            <button className="button"> Gravar </button>
          </div>
        </form>
      </section>
    </div>
  );
}
