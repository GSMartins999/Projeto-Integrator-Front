import React from "react";
import BotaoBranco from "../../components/botoes/botaoBranco";
import BotaoColorido from "../../components/botoes/botaoColorido";
import Imagem from "../../components/imagemLabenu/imagem";
import styles from "./login.module.css";
import { useForm } from "../../hooks/useForm";

function Login() {
  const { form, onChangeInputs, clearInputs } = useForm({
    email: "",
    password: "",
  });

  // Função para enviar os dados
  const enviaLogin = (event) => {
    event.preventDefault();
    console.log(form.email, form.password);
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
          {/* Adicione o evento onSubmit e chame a função enviaLogin */}
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
