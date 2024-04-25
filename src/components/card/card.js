import React, { useState } from "react";
import styles from "./card.module.css";
import cima from "./../../img/cima.png";
import baixa from "./../../img/baixa.png";
import comentário from "./../../img/comentário.png";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/BASE_URL";
import axios from "axios";

export const Card = ({ post, userId }) => {
  const [curtido, setCurtido] = useState(post.curtido);
  const [descurtido, setDescurtido] = useState(post.descurtido);
  const [numeroCurtidas, setNumeroCurtidas] = useState(post.numeroCurtidas);
  const [numeroDeslikes, setNumeroDeslikes] = useState(post.numeroDeslikes);

  const handleCurtir = async () => {
    try {
      await axios.post(
        `${BASE_URL}/posts/${post.id}/likes`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCurtido(true);
      setNumeroCurtidas(numeroCurtidas + 1);
      if (descurtido) {
        setDescurtido(false);
        setNumeroDeslikes(numeroDeslikes - 1);
      }
    } catch (error) {
      console.log("Erro ao curtir o post: ", error);
    }
  };

  const handleDescurtir = async () => {
    try {
      await axios.post(
        `${BASE_URL}/posts/${post.id}/deslikes`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDescurtido(true);
      setNumeroDeslikes(numeroDeslikes + 1);
      if (curtido) {
        setCurtido(false);
        setNumeroCurtidas(numeroCurtidas - 1);
      }
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
              <img
                src={cima}
                className={styles.imagemSetas}
                onClick={handleCurtir}
                alt="seta"
              />
            </div>
            {numeroCurtidas - numeroDeslikes}
            <div>
              <img
                src={baixa}
                className={styles.imagemSetas}
                onClick={handleDescurtir}
                alt="seta"
              />
            </div>
          </div>
          <Link
            to={`/comentarios/${post.id}`}
            className={styles.comentsContainer}
          >
            <div className={styles.coments}>
              <img src={comentário} className={styles.imagemSetas} alt="comentario"/>
              <span>{post.numeroComentarios}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
