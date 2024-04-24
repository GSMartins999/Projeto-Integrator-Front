import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import cima from "./../../img/cima.png";
import baixa from "./../../img/baixa.png";
import comentário from "./../../img/comentário.png";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/BASE_URL";
import axios from "axios";

export const Card = ({ post, userId }) => {
  const [curtidas, setCurtidas] = useState(post.numeroCurtidas);
  const [deslikes, setDeslikes] = useState(post.numeroDeslikes);
  const [numeroComentarios, setNumeroComentarios] = useState(post.numeroComentarios);

  useEffect(() => {
    setNumeroComentarios(post.numeroComentarios);
  }, [post.numeroComentarios]);

  const handleCurtir = async () => {
    try {
      await axios.post(`${BASE_URL}/posts/${post.id}/likes`, { userId }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      setCurtidas(curtidas + 1);
    } catch (error) {
      console.log("Erro ao curtir o post: ", error);
    }
  };

  const handleDescurtir = async () => {
    try {
      await axios.post(`${BASE_URL}/posts/${post.id}/deslikes`, { userId }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      setDeslikes(deslikes + 1);
    } catch (error) {
      console.log("Erro ao descurtir o post: ", error);
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
            <div>
              <img src={cima} className={styles.imagemSetas} onClick={handleCurtir} />
            </div>
            {curtidas - deslikes}
            <div>
              <img src={baixa} className={styles.imagemSetas} onClick={handleDescurtir} />
            </div>
          </div>
          <Link to={`/comentarios/${post.id}`} className={styles.comentsContainer}>
            <div className={styles.coments}>
              <img src={comentário} className={styles.imagemSetas} />
              <span>{numeroComentarios}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
