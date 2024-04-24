import React, { useEffect, useState } from "react";
import BotaoColorido from "../../components/botoes/botaoColorido";
import LoginLogout from "../../components/loginLogout/loginLogout";
import styles from "./feed.module.css";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { Card } from "../../components/card/card";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import { useForm } from "../../hooks/useForm";

function Feed() {
  const [texto, setTexto] = useState("");
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const { clearInputs } = useForm({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setTexto(event.target.value);
    if (event.target.value === "") {
      event.target.style.height = "150px";
    } else {
      event.target.style.height =
        Math.max(event.target.scrollHeight, 50) + "px";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          responsavelId: userId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
    clearInputs();
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/posts`, {
        headers: {
          Authorization: token,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    setUserId(userId);

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

      <div className={styles.ContainerCard}>
        {posts.map((post) => (
          <Card key={post.id} post={post} userId={userId} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
