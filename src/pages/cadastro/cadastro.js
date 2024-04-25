import { goToFeed, goToLogin } from "../../Router/cordinator";
import BotaoColorido from "../../components/botoes/botaoColorido";
import LoginLogout from "../../components/loginLogout/loginLogout";
import { BASE_URL } from "../../constants/BASE_URL";
import { useForm } from "../../hooks/useForm";
import styles from "./cadastro.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cadastro() {
  const { form, onChangeInputs, clearInputs } = useForm({
    apelido: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //Função para enviar os dados
  const enviaCadastro = (event) => {
    event.preventDefault();
    const dadosUsuario = {
      apelido: form.apelido,
      email: form.email,
      password: form.password,
    };
    console.log(dadosUsuario);
    //Criando User e pegando o token e armazenando no localStorage
    axios
      .post(`${BASE_URL}/users`, dadosUsuario)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        goToLogin(navigate);
      })
      .catch((error) => {
        console.log(error.response);
      });

    clearInputs();
  };

  return (
    <>
      <div className={styles.containerGeral}>
        <div className={styles.containerObjeto}>
          <LoginLogout />
          <div className={styles.containerTextos}>
            <p className={styles.texto}>Olá, boas vindas ao LabEddit ;</p>
          </div>
        </div>

        <div className={styles.Containerformulario}>
          <form
            onSubmit={enviaCadastro}
            method="post"
            className={styles.formulario}
          >
            <input
              type="name"
              name="apelido"
              placeholder="Apelido"
              className={styles.input}
              value={form.apelido}
              required
              onChange={onChangeInputs}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.input}
              value={form.email}
              required
              onChange={onChangeInputs}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className={styles.input}
              value={form.password}
              onChange={onChangeInputs}
              required
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$"
              title="A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial ($, *, &, @ ou #)"
            />
            <div className={styles.ContainerTextos}>
              <p className={styles.textos}>
                Ao continuar, você concorda com o nosso{" "}
                <a href="" className={styles.estiloTexto}>
                  Contrato de usuário
                </a>{" "}
                e nossa{" "}
                <a href="" className={styles.estiloTexto}>
                  Política de Privacidade
                </a>
              </p>
            </div>

            <div className={styles.ContainerTexto2}>
              <input
                type="checkbox"
                id="topping"
                name="topping"
                value="Paneer"
                className={styles.checkBox}
                required
              />
              <p className={styles.textoCheckBox}>
                Eu concordo em receber emails sobre coisas legais no Labeddit
              </p>
            </div>
            <BotaoColorido type="submit"/>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;