import React from 'react';
import styles from "./botaoColorido.module.css";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

export default function BotaoColorido({onClick}){


    const location = useLocation();

    return (
        <>
            <div>
                {
                    location.pathname === "/login" ? (
                        <button type="submit" className={styles.botao} onClick={onClick}>
                        <p>Continuar</p>
                        </button>
                    ) : location.pathname === "*" ? (
                        <button type="submit" className={styles.botao} onClick={onClick}>
                        <p>Continuar</p>
                        </button>
                    ) : location.pathname === "/cadastro" ? (
                        <button type="submit" className={styles.botao} onClick={onClick}>
                        <p>Cadastrar</p>
                        </button>
                    ): location.pathname === "/home" ? (
                        <button type="submit" className={styles.botao} onClick={onClick}>
                        <p>Postar</p>
                        </button>
                    ) : location.pathname === "/resposta" (
                        <button type="submit" className={styles.botao} onClick={onClick}>
                        <p>Responder</p>
                        </button>
                    ) 
                }

            </div>
        </>
    )
}
