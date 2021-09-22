import styled from "styled-components";
import { React, useContext, useState, useEffect } from "react";
import axios from "axios";

import { CheckSquareFill } from "@styled-icons/bootstrap";
import "dayjs/locale/pt-br";
import UserContext from "../../Contexts/UserContext";

import ProgressContext from "../../Contexts/ProgressContext";
import Header from "../Common-use/Header";
import "react-circular-progressbar/dist/styles.css";
import Footer from "../Common-use/Footer";

export default function Today() {
  const dayjs = require("dayjs");
  let now = dayjs().locale("pt-br");
  let today = now.format("dddd, DD/MM ");
  const [dailyHabit, setDailyhabit] = useState([]);
  const [progressMessage, setProgressmessage] = useState("Nenhum hábito concluído ainda");
  const { user } = useContext(UserContext);

  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/habits/today`,
      config
    );
    promise.then((answer) => setDailyhabit(answer.data));
  }, [user.token]);

  function changeHabit(habit) {
    habit.done = !habit.done;
    setDailyhabit([...dailyHabit]);

    const body = "";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (habit.done) {
      const promise = axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/habits/${habit.id}/check`,
        body,
        config
      );
      promise.then(() => {
        let percent = Math.round(
          (dailyHabit.filter((item) => item.done === true).length /
            dailyHabit.length) *
            100
        );
        setProgress(percent);
        setProgressmessage(`${percent}% dos hábitos concluídos`);
      });
    } else {
      const promise = axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/habits/${habit.id}/uncheck`,
        body,
        config
      );
      promise.then(() => {
        let percent = Math.round(
          (dailyHabit.filter((item) => item.done === true).length /
            dailyHabit.length) *
            100
        );
        setProgress(percent);
        // eslint-disable-next-line no-lone-blocks
        {
          percent === 0
            ? setProgressmessage("Nenhum hábito concluído ainda")
            : setProgressmessage(`${percent}% dos hábitos concluídos`);
        }
      });
    }
  }

  return (
    <PageContent>
      <Header></Header>

      <Day>
        <Title>{today}</Title>
        <p>{progressMessage}</p>
      </Day>

      {dailyHabit.map((habit) => (
        <Routine key={habit.id}>
          <p>{habit.name}</p>
          <span>Sequência atual: {habit.currentSequence} dia(s)</span>
          <span>Seu recorde: {habit.highestSequence} dia(s)</span>
          <CheckSquare
            color={habit.done === true ? "#8FC549" : "#EBEBEB"}
            onClick={() => changeHabit(habit)}
          ></CheckSquare>
        </Routine>
      ))}

      <Footer />
    </PageContent>
  );
}

const PageContent = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: first baseline;
  padding-left: 18px;
  padding-right: 18px;
  background: #e5e5e5;
  flex-direction: column;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  justify-content: space-between;
  align-itens: center;

  p {
    color: #bababa;
    font-size: 20px;
    margin-bottom: 15px;
  }
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

const CheckSquare = styled(CheckSquareFill)`
  height: 69px;
  width: 69px;
  color: ${(props) => props.color};
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

  p {
    color: #666666;
    font-size: 20px;
    margin-bottom: 3px;
  }
  span {
    font-size: 13px;
    color: #666666;
    margin-bottom: 3px;
  }
`;
