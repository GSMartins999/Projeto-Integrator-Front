import React, { useState } from 'react';
import BotaoColorido from '../../components/botoes/botaoColorido';
import LoginLogout from '../../components/loginLogout/loginLogout';
import styles from './home.module.css';

function Feed() {
  //armazenando em um estado o texto para enviar para o backend
  const [texto, setTexto] = useState('');

  const handleChange = (event) => {
    setTexto(event.target.value);
    if (event.target.value === '') {
      //se estiver vazio retorna a altura para 50px
      event.target.style.height = '150px';
    } else {
      // Ajusta a altura do textarea de acordo com o tamanho do texto
      event.target.style.height = Math.max(event.target.scrollHeight, 50) + 'px';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(texto);

  };

  return (
    <div className={styles.ContainerGeral}>
      <LoginLogout />
      <form className={styles.Formulario} onSubmit={handleSubmit}>
        <div className={styles.InputWrapper}>
          <textarea
            className={styles.input}
            placeholder="Escreva aqui seu post..."
            required
            value={texto}
            onChange={handleChange}
            style={{ minHeight: '80px' }} 
          />
        </div>
        <BotaoColorido />
        <div className={styles.LinhaSeparacao}></div>
      </form>
    </div>
  );
}

export default Feed;
