import React from "react";
import BotaoBranco from "../../components/botoes/botaoBranco";
import BotaoColorido from "../../components/botoes/botaoColorido";
import Imagem from "../../components/imagemLabenu/imagem";
import styles from "./login.module.css";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { goToFeed } from "../../Router/cordinator";
import { BASE_URL } from "../../constants/BASE_URL";

function Login() {
  const { form, onChangeInputs, clearInputs } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Função para enviar os dados
  const enviaLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, form);
      const { token } = response.data;
      localStorage.setItem("token", token);
      goToFeed(navigate);
    } catch (error) {
      let errorMessage = "Erro ao fazer login";
      let statusCode = 500;
    
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        statusCode = error.response.status;
      }
      alert(`${errorMessage} - Status: ${statusCode}`);
    }
    clearInputs();
  };

  return (
    <>
      <div className={styles.containerGeral}>
        <div className={styles.containerObjeto}>
          <Imagem />
          <div className={styles.containerTextos}>
            <p className={styles.titulo}>LabEddit</p>
            <p className={styles.texto}>O projeto de rede social da Labenu</p>
          </div>
        </div>

        <div className={styles.Containerformulario}>
          <form onSubmit={enviaLogin} className={styles.formulario}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.input}
              required
              value={form.email}
              onChange={onChangeInputs}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              className={styles.input}
              value={form.password}
              onChange={onChangeInputs}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$"
              title="A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial ($, *, &, @ ou #)"
            />

            <BotaoColorido />
            <div className={styles.LinhaSeparacao}></div>
            <BotaoBranco />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
