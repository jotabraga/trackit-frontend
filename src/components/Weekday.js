import styled from 'styled-components';

export default function Weekday(props){

    const {simbol, id, selected, setSelected} = props;

    function selectDay(id){

       if(selected.includes(id) === true){
           
            setSelected([...selected.filter(day => day !== id)]);   
             
              
        }if(selected.includes(id) === false){

            setSelected([...selected, id]);
          
        }
    }

    return (

        <Day color={selected.includes(id) === true ? "#CFCFCF" : "#FFF"} 
        onClick={() => selectDay(id)}>
            {simbol}
        </Day>
    );
}


const Day = styled.li`
    width: 30px;
    height: 30px;
    background: ${props => props.color};
    color: #dbdbdb;
    font-size: 20px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-itens: center;
`;
