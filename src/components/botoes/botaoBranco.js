import React from 'react';
import styles from "./botaoBranco.module.css";
import { useNavigate } from "react-router-dom";
import { goToCadastro } from "../../Router/cordinator";

export default function BotaoBranco({ onClick }) {
    const navigate = useNavigate();

    const handleCadastrar = () => {
        goToCadastro(navigate);
        if (onClick) onClick();
    };

    return (
        <div>
            <button type="submit" className={styles.botaoBranco} onClick={handleCadastrar}>
                <p className={styles.textoBotao}>Crie uma conta!</p>
            </button>
        </div>
    );
}
