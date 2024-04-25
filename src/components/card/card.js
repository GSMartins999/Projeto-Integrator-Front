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
  const [isCurtido, setIsCurtido] = useState(false);
  const [isDescurtido, setIsDescurtido] = useState(false);
  const [numeroComentarios, setNumeroComentarios] = useState(post.numeroComentarios);

  useEffect(() => {
    setNumeroComentarios(post.numeroComentarios);
    
    // Verificar se o usuário já curtiu o post anteriormente
    const liked = localStorage.getItem(`liked_${post.id}`);
    setIsCurtido(liked === 'true');

    // Verificar se o usuário já descurtiu o post anteriormente
    const disliked = localStorage.getItem(`disliked_${post.id}`);
    setIsDescurtido(disliked === 'true');
  }, [post.numeroComentarios, post.id]);

  const handleCurtir = async () => {
    try {
      if (!isCurtido) {
        await axios.post(`${BASE_URL}/posts/${post.id}/likes`, { userId }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        });
        setCurtidas(curtidas + 1);
        setIsCurtido(true);
        localStorage.setItem(`liked_${post.id}`, 'true');
        if (isDescurtido) {
          setDeslikes(deslikes - 1);
          setIsDescurtido(false);
          localStorage.removeItem(`disliked_${post.id}`);
        }
      }
    } catch (error) {
      console.log("Erro ao curtir o post: ", error);
    }
  };
  
  const handleDescurtir = async () => {
    try {
      if (!isDescurtido) {
        await axios.post(`${BASE_URL}/posts/${post.id}/deslikes`, { userId }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        });
        setDeslikes(deslikes + 1);
        setIsDescurtido(true);
        localStorage.setItem(`disliked_${post.id}`, 'true');
        if (isCurtido) {
          setCurtidas(curtidas - 1);
          setIsCurtido(false);
          localStorage.removeItem(`liked_${post.id}`);
        }
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
            <button>
              <img src={cima} className={styles.imagemSetas} onClick={handleCurtir} />
            </button>
            {curtidas - deslikes}
            <button>
              <img src={baixa} className={styles.imagemSetas} onClick={handleDescurtir} />
            </button>
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
