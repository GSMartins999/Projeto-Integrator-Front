import React, { useEffect, useState } from "react";
import LoginLogout from "../../components/loginLogout/loginLogout";
import BotaoColorido from "../../components/botoes/botaoColorido";
import styles from "./comentarios.module.css";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import cima from "./../../img/cima.png";
import baixa from "./../../img/baixa.png";

function Comentarios() {
  const { postId } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [textoComentario, setTextoComentario] = useState("");
  const [userId, setUserId] = useState("");
  const [curtidasDeslikes, setCurtidasDeslikes] = useState({});

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
        const response = await axios.get(
          `${BASE_URL}/posts/${postId}/comentarios`
        );
        setComentarios(response.data);
        initializeCurtidasDeslikes(response.data);
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

  const initializeCurtidasDeslikes = (comentarios) => {
    const initialCurtidasDeslikes = comentarios.reduce((acc, comentario) => {
      acc[comentario.id] = {
        curtidas: comentario.numeroCurtidas,
        deslikes: comentario.numeroDeslikes,
        liked: false,
        disliked: false
      };
      return acc;
    }, {});
    setCurtidasDeslikes(initialCurtidasDeslikes);
  };

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
          responsavelId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedComments = await axios.get(
        `${BASE_URL}/posts/${postId}/comentarios`
      );
      setComentarios(updatedComments.data);
      initializeCurtidasDeslikes(updatedComments.data);
    } catch (error) {
      console.log("Erro ao adicionar comentário: ", error);
    }
  };

  const handleCurtir = async (postId, comentarioId) => {
    try {
      await axios.post(
        `${BASE_URL}/posts/${postId}/comentarios/${comentarioId}/likes`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCurtidasDeslikes((prevState) => ({
        ...prevState,
        [comentarioId]: {
          ...prevState[comentarioId],
          curtidas: prevState[comentarioId].liked
            ? prevState[comentarioId].curtidas - 1
            : prevState[comentarioId].curtidas + 1,
          liked: !prevState[comentarioId].liked,
          disliked: false
        },
      }));
    } catch (error) {
      console.log("Erro ao curtir o comentário: ", error);
    }
  };

  const handleDescurtir = async (postId, comentarioId) => {
    try {
      await axios.post(
        `${BASE_URL}/posts/${postId}/comentarios/${comentarioId}/deslikes`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCurtidasDeslikes((prevState) => ({
        ...prevState,
        [comentarioId]: {
          ...prevState[comentarioId],
          deslikes: prevState[comentarioId].disliked
            ? prevState[comentarioId].deslikes - 1
            : prevState[comentarioId].deslikes + 1,
          disliked: !prevState[comentarioId].disliked,
          liked: false
        },
      }));
    } catch (error) {
      console.log("Erro ao descurtir o comentário: ", error);
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
          <p className={styles.texto}>
            Nenhum comentário encontrado para este post.
          </p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario.id} className={styles.ContainerCard}>
              <p className={styles.titulo}>
                Enviado por: {comentario.responsavelId}
              </p>
              <p className={styles.textos}>{comentario.comentario}</p>
              <div className={styles.container}>
                <div className={styles.card}>
                  <div className={styles.ContainerCurtidasComent}>
                    <div className={styles.containerlikesDeslikes}>
                      <button
                        className={`${styles.buttonCurtir} ${curtidasDeslikes[comentario.id].liked ? styles.active : ""}`}
                        onClick={() =>
                          handleCurtir(postId, comentario.id)
                        }
                      >
                        <img src={cima} className={styles.imagemSetas} />
                      </button>
                      {curtidasDeslikes[comentario.id].curtidas -
                        curtidasDeslikes[comentario.id].deslikes}
                      <button
                        className={`${styles.buttonDescurtir} ${curtidasDeslikes[comentario.id].disliked ? styles.active : ""}`}
                        onClick={() =>
                          handleDescurtir(postId, comentario.id)
                        }
                      >
                        <img src={baixa} className={styles.imagemSetas} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comentarios;
