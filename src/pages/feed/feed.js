// Feed.js

import React, { useEffect, useState } from "react";
import BotaoColorido from "../../components/botoes/botaoColorido";
import LoginLogout from "../../components/loginLogout/loginLogout";
import styles from "./feed.module.css";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useForm } from "../../hooks/useForm";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import { Card } from "../../components/card/card";

function Feed() {
  // Armazenando em um estado o texto para enviar para o backend
  const [texto, setTexto] = useState("");
  const { clearInputs } = useForm({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setTexto(event.target.value);
    if (event.target.value === "") {
      // Se estiver vazio, retorna a altura para 50px
      event.target.style.height = "150px";
    } else {
      // Ajusta a altura do textarea de acordo com o tamanho do texto
      event.target.style.height =
        Math.max(event.target.scrollHeight, 50) + "px";
    }
  };

  const handleSubmit = async (event) => {
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error("Erro: Token inválido ou não encontrado.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/posts`,
        {
          description: texto,
          numeroCurtidas: 0,
          numeroDeslikes: 0,
          numeroComentarios: 0,
          responsavelId: userId, // Adiciona o ID do usuário como responsável do post
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    clearInputs();
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.log("Error", error.response);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className={styles.ContainerGeral}>
      <LoginLogout />
      <form className={styles.Formulario} onSubmit={handleSubmit}>
        <div className={styles.InputWrapper}>
          <textarea
            className={styles.input}
            placeholder="Escreva aqui seu post..."
            required
            value={texto}
            onChange={handleChange}
            style={{ minHeight: "80px" }}
          />
        </div>
        <BotaoColorido />
        <div className={styles.LinhaSeparacao}></div>
      </form>

     <div>
     {posts.map((post) => (
        <Card
          key={post.id}
          post={post}
        />
      ))}
  </div>
    </div>
  );
}

export default Feed;
