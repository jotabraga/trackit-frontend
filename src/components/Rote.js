import {TrashFill} from '@styled-icons/bootstrap'
import Weekday from "./Weekday";
import styled from 'styled-components';
import axios from "axios";

export default function Rote(props){

    const { week, days, name, id, token, habits, setHabits } = props;

    function excludeHabit(id){
        console.log(id);
        
        if(window.confirm("Deseja excluir o hábito?")){
            

                const config = {
                    headers: 
                    {
                        Authorization: `Bearer ${token}`
                    }
                }
                const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);

                
                promise.then(() => setHabits([...habits]));
            
        }
    }



    return(
        <div>
            <p>{name}</p>
            <TrashCan onClick={(() => excludeHabit(id))} ></TrashCan>

            <Weekdays>
                {week.map((day) => <Weekday key={day.id} id={day.id} simbol={day.letter} selected={days} />)} 
            </Weekdays>
        </div>
    );
}

const Weekdays = styled.ul`
display: flex;
justify-content: space-between;
margin-top: 8px;
margin-bottom: 30px;
width: auto;
height: auto;    
`;

const TrashCan = styled(TrashFill)`
    height: 18px;
    width: 16px;
    color: #666666;
    position: absolute;
    top: 11px;
    left: 83vw;
`;
