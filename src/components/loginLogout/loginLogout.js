import { goToLogin } from "../../Router/cordinator"
import Imagem from "../imagemLabenu/imagem"
import styles from "./loginLogout.module.css"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function LoginLogout (){

const location = useLocation();

const navigate = useNavigate();

const handleLogin = () => {
    goToLogin(navigate)
}

let buttonText = "";

// Determinando o texto do botão com base na página atual
switch (location.pathname) {
    case "/cadastro":
        buttonText = "Login";
        break;
    default:
        buttonText = "Logout"
}

    return(
        <>
        <div className={styles.LoginPelaBarra}>
            <Imagem/>
            <p className={styles.botaoLogin} onClick={handleLogin}>{buttonText}</p>
        </div>
        </>
    )
}
