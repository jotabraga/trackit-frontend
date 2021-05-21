import styled from 'styled-components';
import {React, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {CheckSquareFill} from '@styled-icons/bootstrap'
import "dayjs/locale/pt-br";
import UserContext from "./UserContext";
import { CircularProgressbar } from 'react-circular-progressbar';


export default function Today(){
   
    const dayjs = require('dayjs');
    let now = dayjs().locale('pt-br');
    let today = now.format("dddd, DD/MM ");
    console.log(today);
    const [dailyHabit, setDailyhabit] = useState([]);
    const [doneHabits, setDonehabits] = useState([]);
    const [percent, setPercent] = useState(0.0);


    const {user} = useContext(UserContext);

    useEffect(() => {
        
        const config = {
            headers: 
            {
                Authorization: `Bearer ${user.token}`
            }
        }
        
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then((answer) => {

            setDailyhabit(answer.data);
            console.log(answer.data);
            console.log(doneHabits);

                                            
        });
    }, [user.token]); 


    function payHabit(id, condition){

        if(condition === false) {

            const body = "";            

            const config = {
                headers: 
                {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config);
            promise.then(()=> {
                setDonehabits(...doneHabits, id);
                setPercent((parseFloat(doneHabits.length/dailyHabit.length)).toFixed(1));
                console.log(doneHabits);
            });

        }
        if(condition === true){

            const body = "";            

            const config = {
                headers: 
                {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config);
            promise.then(()=>setDonehabits(...doneHabits.filter(item => item !== id)));
        }           
        
    }

 

    

    return(

        <PageContent>


            <Header>

                <p>TrackIt</p>
                <Circle><img src={user.image} alt="profile-pic" /></Circle>
                
            </Header>

            <Day>
                    <Title>{today}</Title>
                    <p>Nenhum hábito concluído ainda</p>
            </Day>            

            {dailyHabit.map((habit) => (

                <Routine key={habit.id}>

                    <p>{habit.name}</p>
                    <span>Sequência atual: {habit.currentSequence} dias</span>
                    <span>Seu recorde: {habit.highestSequence} dias</span>

                    <CheckSquare color={doneHabits.includes(habit.id) === true ? "#8FC549" : "EBEBEB" } onClick={() => payHabit(habit.id, habit.done)}>
                    </CheckSquare>  
                </Routine>

            ))}
            
            <Footer>

                <Link to="/habitos"> 
                    <p>Hábitos</p>
                </Link>

                <button>Hoje</button>

                <p>Histórico</p>
            </Footer>

        </PageContent>
    );
}

const PageContent = styled.div`
    width: 100vw;
    display: flex;
    height: 100vh;
    justify-content: first baseline;
    padding-left: 18px;
    padding-right: 18px;
    background: #E5E5E5;
    flex-direction: column;
`;

const Header = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10), 0 6px 20px 0 rgba(0, 0, 0, 0.09); 
    width: 100vw;
    height: 70px;
    background: #126BA5;
    padding-left: 18px;
    padding-right: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Playball', cursive;
    color: #fff;
    p{
        font-size: 39px;
    }
`;

const Circle = styled.div`
    background-color: #fff;
    border-radius: 50%;
    width: 51px;
    height: 51px;
    overflow: hidden;
    position: relative;
    
    img{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
`;

const Day = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    justify-content: space-between;
    align-itens: center;   
    
    p{
        color: #BABABA;
        font-size: 20px;
        margin-bottom: 15px;       
    }
`;

const Title = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background: #E5E5E5;
    margin-top: 92px;
    color: #126BA5;
    font-size: 23px;
    line-height: 35px;
`;

const CheckSquare = styled(CheckSquareFill)`
    height: 69px;
    width: 69px;
    background: ${props => props.color};
    border-radius: 5px;
    border: none;
    position: absolute;
    top: 13px;
    left: 70vw;
`;

const Routine = styled.div` 
    display: flex;
    width: auto;
    flex-direction: column;
    background: #fff;
    padding: 18px;
    height: 91px;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;

    p{
        color: #666666;
        font-size: 20px;
        margin-bottom: 3px;
    }
    span{
        font-size: 13px;
        color: #666666;
        margin-bottom: 3px;
        
    }
`;

const Footer = styled.div`
    position: fixed;
    background: #fff;
    display: flex;
    justify-content: space-between;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100vw;
    padding-left: 30px;
    padding-right: 30px;
    align-text: center;

    p{
        font-size: 18px;
        color: #52B6FF;   
        line-height: 70px;            
    }
    button{
        position: fixed;
        left: calc(50vw - 45.5px);
        bottom: 2px;
        z-index: 2;
        height: 91px;
        width: 91px;
        color: #fff;
        background: #52B6FF;
        border-radius: 50%;
        font-size: 18px;
        border: none;
        margin-bottom: 15px;
    }
`;
