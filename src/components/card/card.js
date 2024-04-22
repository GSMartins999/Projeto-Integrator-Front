import React, { useState } from "react";
import styles from "./card.module.css";
import cima from "./../../img/cima.png"
import baixa from "./../../img/baixa.png"
import comentário from "./../../img/comentário.png"

export const Card = ({ post }) => {
  const [curtidas, setCurtidas] = useState(post.numeroCurtidas);
  const [deslikes, setDeslikes] = useState(post.numeroDeslikes);

  const handleCurtir = () => {
    setCurtidas(curtidas + 1);
  };

  const handleDescurtir = () => {
    setDeslikes(deslikes + 1);
  };

  const numeroCurtidas = curtidas - deslikes;

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
                <img src={cima} className={styles.imagemSetas} onClick={handleCurtir}/>
              </div>
              {numeroCurtidas} 
              <div>
                <img src={baixa} className={styles.imagemSetas} onClick={handleDescurtir}/>
              </div>
              
          </div>
         
          <div>
            <div className={styles.coments}>
              <img src={comentário} className={styles.imagemSetas}/>{post.numeroComentarios}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
