import styled from "styled-components";
import { React, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AddSquare } from "@styled-icons/fluentui-system-filled";
import UserContext from "../../Contexts/UserContext";
import Weekday from "./Weekday";
import DailyContent from "./DailyContent";
import Header from "../Common-use/Header";
import Footer from "../Common-use/Footer";

export default function Habits() {
  const { user, setUser } = useContext(UserContext);
  const [habitName, setHabitname] = useState("");
  const [addBox, setAddbox] = useState("none");
  const week = [
    { letter: "D", id: 0 },
    { letter: "S", id: 1 },
    { letter: "T", id: 2 },
    { letter: "Q", id: 3 },
    { letter: "Q", id: 4 },
    { letter: "S", id: 5 },
    { letter: "S", id: 6 },
  ];
  const [selected, setSelected] = useState([]);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [setUser]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits`, config);

    promise.then((answer) => {
      setHabits(answer.data);
    });
  }, [user?.token]);

  function saveHabit() {
    const body = {
      name: habitName,
      days: selected,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/habits`,
      body,
      config
    );
    promise.then((response) => setHabits([...habits, response.data]));
  }

  return (
    <>
      <Header />

      <HabitsContent>
        <AddNewHabit>
          <Title>
            Meus hábitos
            <AddSquareBlue onClick={() => setAddbox("block")}></AddSquareBlue>
          </Title>
        </AddNewHabit>

        <NewHabitBox visibility={addBox}>
          <input
            type="text"
            placeholder="nome do hábito"
            value={habitName}
            onChange={(e) => setHabitname(e.target.value)}
          />

          <Weekdays>
            {week.map((day) => (
              <Weekday
                key={day.id}
                id={day.id}
                simbol={day.letter}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Weekdays>

          <Choices>
            <p onClick={() => setAddbox("none")}>Cancelar</p>
            <button onClick={() => saveHabit()}>Salvar</button>
          </Choices>
        </NewHabitBox>

        {habits.map((habit) => (
          <DailyContent
            key={habit.id}
            days={habit.days}
            name={habit.name}
            week={week}
            id={habit.id}
            habits={habits}
            setHabits={setHabits}
            token={user.token}
          />
        ))}

        <NoHabitsYet visibility={habits.length > 0 ? "none" : "flex"}>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </NoHabitsYet>
        <Footer />


      </HabitsContent>
    </>
  );
}

const HabitsContent = styled.div`
  width: 100vw;
  display: flex;
  height: 100vh;
  justify-content: first baseline;
  padding-left: 18px;
  padding-right: 18px;
  background: #e5e5e5;
  flex-direction: column;
`;

const AddNewHabit = styled.div`
  display: flex;
  justify-content: space-between;
  align-itens: center;
  display: ${(props) => props.visibility};
`;

const Title = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background: #e5e5e5;
  margin-top: 92px;
  color: #126ba5;
  font-size: 23px;
  line-height: 35px;
`;

const AddSquareBlue = styled(AddSquare)`
  height: 35px;
  width: 35px;
  color: #52b6ff;
`;

const NoHabitsYet = styled.div`
  font-size: 18px;
  display: ${(props) => props.visibility};
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

const NewHabitBox = styled.div`
  background: #fff;
  padding: 18px;
  width: auto;
  height: 180px;
  border-radius: 5px;
  margin-top: 30px;
  display: ${(props) => props.visibility};
  input {
    width: 100%;
    height: 45px;
    margin-bottom: 6px;
    border-radius: 5px;
    border: 1px #d4d4d4 solid;

    padding-left: 11px;
    font-size: 20px;
  }
  input::placeholder {
    color: #dbdbdb;
  }
`;

const Choices = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 5px;
    background: #52b6ff;
    color: #fff;
    width: 84px;
    height: 35px;
    border: none;
  }
  p {
    font-size: 16px;
    color: #52b6ff;
    line-height: 35px;
    margin-right: 15px;
  }
`;
