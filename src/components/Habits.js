import styled from 'styled-components';
import {React, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AddSquare} from '@styled-icons/fluentui-system-filled'
import UserContext from "./UserContext";
import Weekday from "./Weekday";
import Rote from "./Rote";
import { CircularProgressbar } from 'react-circular-progressbar';

export default function Habits(){

    const {user} = useContext(UserContext);
    const [habitName, setHabitname] = useState("");
    const [addBox, setAddbox] = useState("none");
    const week = [{letter:"D", id:0},{letter:"S", id:1},{letter:"T", id:2},{letter:"Q", id:3},{letter:"Q", id:4},{letter:"S", id:5},{letter:"S", id:6}];
    const [selected, setSelected] = useState([]);
    const [habits, setHabits] = useState([]);
    

    useEffect(() => {
        
        const config = {
            headers: 
            {
                Authorization: `Bearer ${user.token}`
            }
        }
        
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then((answer) => {
            setHabits(answer.data);                                  
        });

    }, [user.token]);   

    

    function saveHabit(){
        
        const body = {
            name: habitName,
            days: selected
        }

        const config = {
            headers: 
            {
                Authorization: `Bearer ${user.token}`
            }
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        promise.then((response) => setHabits([...habits, response.data ]));
    }

    
    console.log(habits);




    return(

        <>
        <Header>

            <p>TrackIt</p>
            <Circle><img src={user.image} alt="profile-pic" /></Circle>
            
        </Header>

        <HabitsContent>

            <AddNewHabit>
                <Title>Meus hábitos<AddSquareBlue onClick={() => setAddbox("block")}></AddSquareBlue></Title>
            </AddNewHabit>

            <NewHabitBox visibility={addBox}>
                <input type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitname(e.target.value)} />

                <Weekdays>
                    {week.map((day) => <Weekday key={day.id} id={day.id} simbol={day.letter} selected={selected} setSelected={setSelected} />)} 
                </Weekdays>

                <Choices>
                    <p onClick={() => setAddbox("none")} >Cancelar</p><button onClick={() => saveHabit()}>Salvar</button>
                </Choices>
            </NewHabitBox>

            
                {habits.map((habit) => <Rote key={habit.id} days={habit.days} name={habit.name} week={week} id={habit.id} 
                habits={habits} setHabits={setHabits} token={user.token} />)}      
        

            <NoHabitsYet visibility={habits.length > 0 ? "none" : "flex"} >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabitsYet>

            

            <Footer>
                <p>Hábitos</p>

                <Link to="/hoje">
                    <button>Hoje</button>
                </Link>

                <p>Histórico</p>
            </Footer>

        </HabitsContent>

            
        </>

    );
}

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

const HabitsContent = styled.div`
    width: 100vw;
    display: flex;
    height: 100vh;
    justify-content: first baseline;
    padding-left: 18px;
    padding-right: 18px;
    background: #E5E5E5;
    flex-direction: column;
`;

const AddNewHabit = styled.div`
    display: flex;
    justify-content: space-between;
    align-itens: center;   
    display: ${props => props.visibility};
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

const AddSquareBlue = styled(AddSquare)`
    height: 35px;
    width: 35px;
    color: #52B6FF;
`;

const NoHabitsYet = styled.div`
    font-size: 18px;
    display: ${props => props.visibility};
    flex-wrap: wrap;
    margin-top: 30px;
    color: #666666;
`;
const Weekdays = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 30px;
    width: auto;
    height: auto;

    
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
const NewHabitBox = styled.div`
    background: #fff;
    padding: 18px;
    width: auto;
    height: 180px;
    border-radius: 5px;
    margin-top: 30px;
    display: ${props => props.visibility};
    

    input{
        width: 100%;
        height: 45px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px #d4d4d4 solid;

        padding-left: 11px;
        font-size: 20px;
    }
    input::placeholder{
        color: #DBDBDB;
    }
    
   
`;

const Choices = styled.div`
    display: flex;
    justify-content: flex-end;    

    button{
        border-radius: 5px;
        background: #52B6FF;
        color: #fff;
        width: 84px;
        height: 35px;
        border: none;
    }
    p{
        font-size: 16px;
        color: #52B6FF;
        line-height: 35px;
        margin-right: 15px;
    }
`;



