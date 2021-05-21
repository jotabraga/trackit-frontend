import styled from 'styled-components';
import React from 'react';
import logo from "../images/logo.jpg";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ReactLoading from 'react-loading';

export default function MainPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState("Cadastrar");

    let history = useHistory();

    function register(e){

        e.preventDefault();
        
        setDisabled(!disabled);
        setLoading(<ReactLoading type={'bubbles'} color={'#fff'} height={'10%'} width={'20%'} />);

        const body = {
            email,
            name,
            image,
            password
        };


        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);

        request.then((e) => history.push("/"));

        request.catch(e => {
            setDisabled(!disabled);
            setLoading("Cadastrar");
            console.log(e)
        });
    }

    return(

    <Register>
        <img src={logo} alt="logo"/>

        <form onSubmit={register}>

            <input type="email" required placeholder="email" disabled={disabled} value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" required placeholder="senha" disabled={disabled} value={password} onChange={(e) => setPassword(e.target.value)} />

            <input type="text" required placeholder="nome" disabled={disabled} value={name} onChange={(e) => setName(e.target.value)} />

            <input type="url" required placeholder="foto" disabled={disabled} value={image} onChange={(e) => setImage(e.target.value)} />

            <button type="submit"> {loading} </button>

            <Link to={"/"}> <p>Já tem uma conta? Faça login!</p> </Link>

        </form>

       

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
    
    button{
        background: #52b6ff;
        color: #fff;
        border-radius: 5px;
        border: 1px #d4d4d4 solid;
        text-align: center;
        display: flex;
        justify-content: center;
        line-height: 45px;
        width: 303px;
        height: 45px;
        font-size: 21px;
        margin-bottom: 15px;
    }

    form{
        width: 303px;
        height: 45px;        

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
        
        p{
            font-size: 14px;
            color: #52B6FF;
            text-decoration: underline;
            text-align: center;
        }
        svg{
            height: 45px;
            width: 60px;
        }
    }    
`;
