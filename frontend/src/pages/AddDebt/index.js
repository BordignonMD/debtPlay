import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUser, BiDetail, BiCalendar } from "react-icons/bi";
import axios from "axios";

import api from '../../services/api';
import history from '../../history';

import "./styles.css";

export default function AddDebt() {
  const dateToday = new Date();
  const dateTodayFormat = dateToday.getFullYear().toString() + '-' + (dateToday.getMonth() + 1).toString().padStart(2, '0') + '-' + dateToday.getDate().toString().padStart(2, '0');
  
  const [selectedClient, setSelectedClient] = useState(0);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [reason, setReason] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(dateTodayFormat);

  const [clients, setClients] = useState([]);

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setClients(response.data);
    }, []);
  }, []);

  function handleChangeSelect(e) {
    setSelectedClientName(e.target.value);
    setSelectedClient(e.target.selectedIndex);
  }

  async function handlerAddDebt(e) {
    e.preventDefault();

    const data = {
      id_client: selectedClient,
      name_client: selectedClientName,
      reason,
      value,
      date,
    };

    try {
      await api.post('debt', data, {
        headers: {
          id_user: userId,
        }});

      alert('Divida adicionada com sucesso!');

      history.push('/home');
    } catch (err) {
      alert('Erro na adição da dívida, tente novamente');
    }
  }

  return (
    <div className="addDebt-container">
      <header>
        <h1>DebtPlay</h1>
        <Link className="button" to="/home">
          Voltar
        </Link>
      </header>
      
      <section className="form">
        <h1> Adicionar Dívida </h1>
        <form onSubmit={handlerAddDebt}>
          <label> Cliente </label>
          <div class="icon-input">
            <BiUser className="icon-adddebt" size={20} />
            <div>
              <select
                name="name"
                id="name"
                value={selectedClientName}
                onChange={(event) => handleChangeSelect(event)}
              >
                <option value="0">Selecione um(a) cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
              
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
