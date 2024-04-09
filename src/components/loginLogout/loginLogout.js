import Imagem from "../imagemLabenu/imagem"
import styles from "./loginLogout.module.css"

export default function LoginLogout (){


    return(
        <>
            <div className={styles.Container}>
                <Imagem/>
                <div className={styles.ContainerEntrarSairBotao}>
                    <a className={styles.botaoEntrarSair} href="">TextoMuda</a>
                </div>
            </div> 
        </>
    )
}