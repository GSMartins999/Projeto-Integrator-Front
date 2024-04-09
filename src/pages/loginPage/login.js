import BotaoBranco from "../../components/botoes/botaoBranco"
import BotaoColorido from "../../components/botoes/botaoColorido"
import Imagem from "../../components/imagemLabenu/imagem"
import styles from "./login.module.css"


export default function Login(){

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
                        <input type="e-mail" name="email" placeholder="E-mail" className={styles.input}/>
                        <input type="password" name="password" placeholder="Senha" className={styles.input}/>
                    </form>
                </div>

                <div className={styles.ContainerBotoes}>
                    <BotaoColorido/>
                    <div className={styles.LinhaSeparacao}></div>
                    <BotaoBranco/>
                </div>
            </div> 
        </>
    )
}