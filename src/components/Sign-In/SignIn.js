import styled from 'styled-components';
import React, { useContext } from 'react';
import logo from "../images/logo.jpg";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ReactLoading from 'react-loading';
import UserContext from "../../Contexts/UserContext";

export default function MainPage(){

    const {setUser} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(<h1>Entrar</h1>);

    let history = useHistory();

    function login(e) {

        e.preventDefault();

        setDisabled(!disabled);
        setLoading(<ReactLoading type={'bubbles'} color={'#fff'} height={'10%'} width={'20%'} />);

        const body = {
          email,
          password
        };
    
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);

        request.then((response) => {
            setUser(response.data);
            history.push("/habitos");
        });

        request.catch(e => {
            setDisabled(!disabled);
            setLoading("Cadastrar");
            alert("Dados incorretos, insira os dados corretos.");
        });
      }     

    return(
        <Login>

            <img src={logo} alt="logo"/>

            <form onSubmit={login}>
          
                <input type="text" placeholder="email" disabled={disabled} value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="senha" disabled={disabled} value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={login}>{loading}</button>

                <Link to={"/cadastro"}> <p>Não tem uma conta? Cadastre-se!</p> </Link>

            </form>           

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
        display: flex;
        justify-content: center;
        align-itens: center;
        width: 303px;
        height: 45px;
        font-size: 21px;
        margin-bottom: 25px;

        svg{
            height: 45px;
            width: 60px;
        }        
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
            color: #000;
            padding-left: 11px;
            font-size: 20px;
        }
        
        p{
            font-size: 14px;
            color: #52B6FF;
            text-decoration: underline;
            text-align: center;
        }

        h1{
            line-height: 45px;
            color: #fff;
        }        
    }    
`;


