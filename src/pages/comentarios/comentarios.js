import React, { useEffect, useState } from "react";
import LoginLogout from "../../components/loginLogout/loginLogout";
import BotaoColorido from "../../components/botoes/botaoColorido";
import styles from "./comentarios.module.css";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Comentarios() {
  const { postId } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [textoComentario, setTextoComentario] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}/comentarios`);
        setComentarios(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Nenhum comentário encontrado para o post.");
          setComentarios([]);
        } else {
          console.log("Erro ao buscar comentários: ", error);
        }
      }
    };

    fetchComentarios();
  }, [postId]);

  const handleChangeComentario = (event) => {
    setTextoComentario(event.target.value);
  };

  const handleSubmitComentario = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token inválido ou não encontrado.");
        return;
      }
      await axios.post(
        `${BASE_URL}/posts/${postId}/comentarios`,
        {
          comentario: textoComentario,
          responsavelId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Atualize apenas os comentários do post atual após a adição de um novo comentário
      const updatedComments = await axios.get(`${BASE_URL}/posts/${postId}/comentarios`);
      setComentarios(updatedComments.data);
    } catch (error) {
      console.log("Erro ao adicionar comentário: ", error);
    }
  };

  return (
    <div className={styles.ContainerGeral}>
      <LoginLogout />
      <form className={styles.Formulario} onSubmit={handleSubmitComentario}>
        <div className={styles.InputWrapper}>
          <textarea
            className={styles.input}
            placeholder="Escreva seu comentário..."
            required
            value={textoComentario}
            onChange={handleChangeComentario}
            style={{ minHeight: "80px" }}
          />
        </div>
        <BotaoColorido />
        <div className={styles.LinhaSeparacao}></div>
      </form>

      <div className={styles.ContainerComentarios}>
        {comentarios.length === 0 ? (
          <p className={styles.texto}>Nenhum comentário encontrado para este post.</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario.id} className={styles.ContainerCard}>
              <p className={styles.texto}>Enviado por: {comentario.responsavelId}</p>
              <p className={styles.texto}>{comentario.comentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comentarios;
