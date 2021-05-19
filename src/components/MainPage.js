import styled from 'styled-components';
import React from 'react';
import logo from "../images/logo.jpg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainPage(){

    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function login() {
        const body = {
          email,
          password: senha
        };
    
        const request = axios.post(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/exercise-login/auth/login",
          body
        );
        request.then((response) => setToken(response.data.token));
      }

      


    return(
        <Login>
            <img src={logo} alt="logo"/>

            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

            <button onClick={login}>Entrar</button>

            <Link to={"/cadastro"}> <CadastreSe>Não tem uma conta? Cadastre-se!</CadastreSe> </Link>

        </Login>
    );
}

const Login = styled.div`
    width: 100vw;
    background: #fff;
    padding-top: 68px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    
    img{
        width: 180px;
        height: 180px;
        margin-bottom: 32px;
    }
    input{
        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px #d4d4d4 solid;
        color: #dbdbdb;
        padding-left: 11px;
        font-size: 20px;
    }
    button{
        background: #52b6ff;
        color: #fff;
        border-radius: 5px;
        border: 1px #d4d4d4 solid;
        text-align: center;
        width: 303px;
        height: 45px;
        font-size: 21px;
        margin-bottom: 25px;
    }
    
`;
const CadastreSe = styled.div`
    font-size: 14px;
    color: #52B6FF;
    text-decoration: underline;
`;