import styled from 'styled-components';

import {React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bob from "../images/bob.png";
import {AddSquare} from '@styled-icons/fluentui-system-filled'

export default function Habits(){

    const [adding, setAdding] = useState(false);


    return(

        <>
        <Header>

            <p>TrackIt</p>
            <Circle><img src={bob} alt="profile-pic" /></Circle>
            
        </Header>

        <HabitsContent>

            <AddNewHabit>
                <Title>Meus hábitos<AddSquareBlue></AddSquareBlue></Title>
            </AddNewHabit> 
            <NoHabitsYet>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabitsYet>

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
`;

const Title = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background: #E5E5E5;
    margin-top: 92px;
    color: #126BA5;
    font-size: 23px;
`;

const AddSquareBlue = styled(AddSquare)`
    height: 35px;
    width: 35px;
    color: #52B6FF;
`;

const NoHabitsYet = styled.div`
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    color: #666666;
`;