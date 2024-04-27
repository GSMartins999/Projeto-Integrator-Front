import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import cima from "./../../img/cima.png";
import baixa from "./../../img/baixa.png";
import comentário from "./../../img/comentário.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const Card = ({ post, userId }) => {
  const [like, setLike] = useState(post.numeroCurtidas);
  const [deslikes, setDeslikes] = useState(post.numeroDeslikes);
  const [likeActive, setLikeActive] = useState(false);
  const [deslikeActive, setDeslikeActive] = useState(false);
  const [previousAction, setPreviousAction] = useState(null);
  const [numeroComentarios, setNumeroComentarios] = useState(0);

  useEffect(() => {
    const storedActions = JSON.parse(localStorage.getItem(`actions_${post.id}_${userId}`));
    if (storedActions) {
      setLikeActive(storedActions.includes("like"));
      setDeslikeActive(storedActions.includes("deslike"));
    } else {
      setLikeActive(false);
      setDeslikeActive(false);
    }

    const fetchNumeroComentarios = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${post.id}/comentarios`);
        setNumeroComentarios(response.data.length);
      } catch (error) {
        console.error("Erro ao obter o número de comentários:", error);
      }
    };

    fetchNumeroComentarios();
  }, [post.id, userId]);

  const handleAction = async (actionType) => {
    try {
      const storedActions = JSON.parse(localStorage.getItem(`actions_${post.id}_${userId}`));
      if (actionType === "like" && !likeActive && (!storedActions || !storedActions.includes("like"))) {
        setLike(prevLike => prevLike + 1);
        setLikeActive(true);
        setDeslikeActive(false);
        setPreviousAction("like");
        localStorage.setItem(`actions_${post.id}_${userId}`, JSON.stringify(["like"]));
        await sendActionsToServer("like");
      } else if (actionType === "deslike" && !deslikeActive && (!storedActions || !storedActions.includes("deslike"))) {
        setDeslikes(prevDeslikes => prevDeslikes + 1);
        setDeslikeActive(true);
        setLikeActive(false);
        setPreviousAction("deslike");
        localStorage.setItem(`actions_${post.id}_${userId}`, JSON.stringify(["deslike"]));
        await sendActionsToServer("deslike");
      } else if ((actionType === "like" && likeActive) || (actionType === "deslike" && deslikeActive)) {
        setLikeActive(false);
        setDeslikeActive(false);
        setPreviousAction(null);
        localStorage.removeItem(`actions_${post.id}_${userId}`);
      }
    } catch (error) {
      console.error("Erro ao realizar ação:", error);
    }
  };

  const sendActionsToServer = async (actionType) => {
    try {
      await axios.post(`${BASE_URL}/posts/${post.id}/${actionType}s`, {
        userId: userId
      });
    } catch (error) {
      console.error(`Erro ao enviar ${actionType} para o servidor:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.titulo}>
          Enviado por: labaluno{post.responsavelId}
        </p>
        <p className={styles.textos}>{post.description}</p>
        <div className={styles.ContainerCurtidasComent}>
          <div className={styles.containerlikesDeslikes}>
            <button onClick={() => handleAction("like")} className={likeActive ? styles.likeActive : ""}>
              <img src={cima} className={styles.imagemSetas}/>
            </button>
            {like - deslikes}
            <button onClick={() => handleAction("deslike")} className={deslikeActive ? styles.deslikeActive : ""}>
              <img src={baixa} className={styles.imagemSetas} />
            </button>
          </div>
          <Link to={`/comentarios/${post.id}`} className={styles.comentsContainer}>
            <button className={styles.coments}>
              <img src={comentário} className={styles.imagemSetas} />
              <span>{numeroComentarios}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
