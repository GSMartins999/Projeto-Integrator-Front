import styles from "./botaoColorido.module.css";

export default function BotaoColorido(){

    return (
        <>
            <div>
                <button type="submit" className={styles.botao}>
                    <p>TextoMuda</p>
                </button>
            </div>
        </>
    )
}
