import styled from 'styled-components';
import React from 'react';
import logo from "../images/logo.jpg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");

    function register(){
        const body = {
            email,
            password,
            name,
            picture
        };

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/exercise-login/auth/login", body);
        request.then((response) => console.log(response));

    }

    return(

    <Register>
        <img src={logo} alt="logo"/>

        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} />

        <input type="text" placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} />

        <input type="text" placeholder="foto" value={picture} onChange={(e) => setPicture(e.target.value)} />

        <button onClick={register}>Cadastrar</button>

        <Link to={"/"}> <CadastreSe>Já tem uma conta? Faça login!</CadastreSe> </Link>

    </Register>

    );
}

const Register = styled.div`
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