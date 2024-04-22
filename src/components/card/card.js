import React from "react";
import styles from "./card.module.css"

export const Card = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.ContainerPost}>
          <p className={styles.textos}>{post.title}</p>
          <p className={styles.textos}>{post.description}</p>
        </div>
      </div>
    </div>
  );
};
