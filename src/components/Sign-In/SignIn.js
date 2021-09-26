import styled from "styled-components";
import React, { useContext } from "react";  
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import UserContext from "../../Contexts/UserContext";

export default function MainPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(<h1>Entrar</h1>);

  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      history.push("/hoje");
    }
  }, [history, setUser]);

  function login(e) {
    e.preventDefault();
    setDisabled(true);
    setLoading(
      <ReactLoading
        type={"bubbles"}
        color={"#fff"}
        height={"10%"}
        width={"20%"}
      />
    );

    const body = {
      email,
      password,
    };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      body
    );

    request.then((response) => {
      const user = JSON.stringify(response.data);
      localStorage.setItem("user", user);
      setUser(JSON.parse(localStorage.getItem("user")));
      history.push("/hoje");
    });

    request.catch((e) => {
      setDisabled(false);
      setLoading(<h1>Entrar</h1>);
      alert("Dados incorretos, insira os dados corretos.");
    });
  }

  return (
    <Login>
      <span>TrackIt</span>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="email"
          disabled={disabled}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="senha"
          disabled={disabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>{loading}</button>
        <Link to={"/cadastro"}>
          <p>Não tem uma conta? Cadastre-se!</p>{" "}
        </Link>
      </form>
    </Login>
  );
}

const Login = styled.div`
  width: 100vw;
  heigh: 100vh;
  background: #080808;
  padding-top: 68px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 180px;
    height: 180px;
    margin-bottom: 32px;
  }
  span {
    font-family: "Playball", cursive;
    font-size: 55px;
    margin-bottom: 15px;
    background: -webkit-linear-gradient(#5f9700, #a0e025);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  input {
    width: 303px;    
    height: 45px;
    margin-bottom: 8px;
    border-radius: 5px;
    border: 1px #d4d4d4 solid;
    color: #dbdbdb;
    padding-left: 11px;
    font-size: 20px;
  }
  button {
    background: #734ea0;
    color: #fff;
    border-radius: 5px;
    border: 0.5px #000 solid;
    display: flex;
    justify-content: center;
    align-itens: center;
    width: 303px;
    height: 45px;
    font-size: 21px;
    margin-bottom: 25px;
    svg {
      height: 45px;
      width: 60px;
    }
  }
  form {
    width: 303px;
    height: 45px;
    input {
      width: 303px;
      height: 45px;
      margin-bottom: 6px;
      border-radius: 5px;
      border: 1px #d4d4d4 solid;
      color: #000;
      padding-left: 11px;
      font-size: 20px;
    }
    p {
      font-size: 14px;
      color: #2300d1;
      text-decoration: underline;
      text-align: center;
    }
    h1 {
      line-height: 45px;
      color: #fff;
    }
  }
`;
