import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]); // Comeca com array vazio

    const history = useHistory();

    // Dispara assim que o component e mostrado em tela
    // () => { } Funcao a ser executada
    // [] quando a funcao vai ser executada, toda vez que se altera o valor de alguma propriedade
    // quando está vazio executa uma unica vez na inicializacao
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        }); // Igual async await
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            // Remove do array o incidente removido
            setIncidents(incidents.filter(
                incident => incident.id !== id));
        }
        catch (err) {
            alert('Erro ao deletar caso!');
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size="18" color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {/* map (iteracao) percorre cada elemento do array */}
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency: 'BRL' })
                            .format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size="20" color="a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}