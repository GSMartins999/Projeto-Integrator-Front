import styles from "./Imagem.module.css"

export default function Imagem (){


    return(
        <>
                <div className={styles.containerImg}>
                    <div className={styles.containerQuadrosLaranjas}>
                        <div className={styles.laranjaEscuro}>
                        </div>
                        <div className={styles.laranjaClaro}>
                        </div>
                    </div>

                    <div className={styles.containerEscuros}> 
                        <div className={styles.preto}>
                        </div>
                        <div className={styles.cinza}>
                        </div>
                    </div>
                </div>
        </>
    )
}