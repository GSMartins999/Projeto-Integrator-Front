import styles from "./botaoBranco.module.css";

export default function BotaoBranco(){

    return (
        <>
            <div>
                <button type="submit" className={styles.botaoBranco}>
                    <p className={styles.textoBotao}>TextoMuda</p>
                </button>
            </div>
        </>
    )
}
