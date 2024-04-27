import React from 'react';
import styles from "./botaoColorido.module.css";
import { useLocation } from "react-router-dom";

export default function BotaoColorido() {
    const location = useLocation();
    let buttonText = "";

    switch (location.pathname) {
        case "/login":
            buttonText = "Continuar";
            break;
        case "/cadastro":
            buttonText = "Cadastrar";
            break;
        case "/home":
            buttonText = "Postar";
            break;
        case "/resposta":
            buttonText = "Responder";
            break;
        default:
            buttonText = "Continuar"
    }

    return (
        <div>
            <button type="submit" className={styles.botao}>
                <p>{buttonText}</p>
            </button>
        </div>
    );
}
