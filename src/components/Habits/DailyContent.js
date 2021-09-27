import { TrashFill } from "@styled-icons/bootstrap";
import styled from "styled-components";
import axios from "axios";

export default function DailyContent(props) {
  const { week, days, name, id, token, habits, setHabits } = props;

  function excludeHabit(id) {

    if (window.confirm("Deseja excluir o hábito?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/habits/${id}`,
        config
      );

      promise.then(() =>
        setHabits([...habits.filter((item) => item.id !== id)])
      );
    }
  }

  return (
    <Routine visibility={habits.length > 0 ? "block" : "none"}>
      <NameContainer>
        <p>{name}</p>
        <TrashCan onClick={() => excludeHabit(id)}></TrashCan>
      </NameContainer>
      <Weekdays>
        {week.map((day) => (
          <Day
            key={day.id}
            color={days.includes(day.id) === true ? "#6ba100" : "#000"}
          >
            {day.letter}
          </Day>
        ))}
      </Weekdays>
    </Routine>
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
  color: #fff;
  position: absolute;
  top: 11px;
  left: 70vw;
`;
const NameContainer = styled.div`
  height: 20px;
  display: flex;
  height: 20px;
  align-items: center;
  p {
    color: #666666;
    font-size: 20px;
  }
`;
const Day = styled.li`
  width: 30px;
  height: 30px;
  background: ${(props) => props.color};
  color: #FFF;
  font-size: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const Routine = styled.div`
  background: #1b200e;
  padding: 15px;
  width: auto;
  height: 91px;
  border-radius: 5px;
  margin-top: 15px;
  position: relative;
  display: ${(props) => props.visibility};
`;
