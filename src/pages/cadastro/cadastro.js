import BotaoColorido from "../../components/botoes/botaoColorido"
import styles from "./cadastro.module.css"
import { useGlobalContext } from "../../contexts/GlobalContext";



function Cadastro(){


    const {apelido, setApelido, email, setEmail, password, setPassword} = useGlobalContext();

    //Função que muda os dados
    const handleChangeApelido = (event) => {
        setApelido(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
        
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    //Função para enviar os dados
    const enviarDados = (event) => {
        event.preventDefault()
        console.log(apelido, email, password)
    }

    
    

    return(
        <>
            <div className={styles.containerGeral}>
                <div className={styles.containerObjeto}>
                    <div className={styles.containerTextos}>
                        <p className={styles.texto}>Olá, boas vindas ao LabEddit ;</p>
                    </div>
                </div>

                <div className={styles.Containerformulario}>
                    <form method="get" action="envio_dados.php" className={styles.formulario}>
                        <input type="name" name="nome" placeholder="Apelido" className={styles.input} value={apelido} onChange={handleChangeApelido}/>
                        <input type="email" name="email" placeholder="E-mail" className={styles.input}
                        value={email} onChange={handleChangeEmail}/>
                        <input type="password" name="password" placeholder="Senha" className={styles.input}
                        value={password} onChange={handleChangePassword}/>
                    </form>
                </div>
                
                <div className={styles.ContainerTextos}>
                    <p className={styles.textos}>Ao continuar, você concorda com o nosso <a href="" className={styles.estiloTexto}>Contrato de usuário</a> e nossa <a href="" className={styles.estiloTexto}>Política de Privacidade</a></p>
                </div>

                <div className={styles.ContainerTexto2}>
                    <input type="checkbox" id="topping" name="topping" value="Paneer" className={styles.checkBox}/>
                    <p className={styles.textos}>Eu concordo em receber emails sobre coisas legais no Labeddit</p>
                </div>
                <div className={styles.ContainerBotoes}>
                    <BotaoColorido onClick={enviarDados}/>
                </div>
            </div> 
        </>
    )
}

export default Cadastro