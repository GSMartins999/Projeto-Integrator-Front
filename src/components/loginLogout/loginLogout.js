import React from "react";
import { goToLogin } from "../../Router/cordinator";
import Imagem from "../imagemLabenu/imagem";
import styles from "./loginLogout.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginLogout() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.removeItem("token");
    goToLogin(navigate);
  };

  const isAuthenticated = localStorage.getItem("token");

  let buttonText = isAuthenticated ? "Logout" : "Login";

  return (
    <>
      <div className={styles.LoginPelaBarra}>
        <Imagem />
        <p className={styles.botaoLogin} onClick={handleLogin}>
          {buttonText}
        </p>
      </div>
    </>
  );
}
