import BotaoBranco from "../../components/botoes/botaoBranco"
import BotaoColorido from "../../components/botoes/botaoColorido"
import Imagem from "../../components/imagemLabenu/imagem"
import styles from "./login.module.css"
import { useGlobalContext } from "../../contexts/GlobalContext";

function Login(){


    const {email, setEmail, password, setPassword} = useGlobalContext();

     //Função que muda os dados
     const handleChangeEmail = (event) => {
        setEmail(event.target.value);
      };
    
      const handleChangePassword = (event) => {
        setPassword(event.target.value);
      };
    //Função para enviar os dados
    const enviarDados = (event) => {
        event.preventDefault()
        console.log(email, password)
    }

    return(
        <>
           <div className={styles.containerGeral}>
                <div className={styles.containerObjeto}>
                    <Imagem/>
                    <div className={styles.containerTextos}>
                        <p className={styles.titulo}>LabEddit</p>
                        <p className={styles.texto}>O projeto de rede social da Labenu</p>
                    </div>
                </div>

                <div className={styles.Containerformulario}>
                    <form method="get" action="envio_dados.php" className={styles.formulario}>
                        <input type="email" name="email" placeholder="E-mail" className={styles.input} value={email} onChange={handleChangeEmail}/>
                        <input type="password" name="password" placeholder="Senha" className={styles.input}value={password} onChange={handleChangePassword}/>
                    </form>
                </div>

                <div className={styles.ContainerBotoes}>
                    <BotaoColorido onClick={enviarDados} />
                    <div className={styles.LinhaSeparacao}></div>
                    <BotaoBranco/>
                </div>
            </div> 
        </>
    )
}

export default Login