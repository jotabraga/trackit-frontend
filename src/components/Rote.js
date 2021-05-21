import {TrashFill} from '@styled-icons/bootstrap'
import Weekday from "./Weekday";
import styled from 'styled-components';

export default function Route(props){

    const {week, days, name } = props;

    return(
        <>
        <p>{name}</p>
                <TrashCan></TrashCan>

                <Weekdays>
                    {week.map((day) => <Weekday key={day.id} id={day.id} simbol={day.letter} selected={days} />)} 
                </Weekdays>
        </>
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
