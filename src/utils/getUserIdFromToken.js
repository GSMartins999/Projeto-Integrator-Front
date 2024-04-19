import { jwtDecode } from "jwt-decode";

// Função para obter o ID do usuário a partir do token armazenado
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  } else {
    return null;
  }
};

export default getUserIdFromToken;
