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
import PageContent from "../Common-use/PageContent";
import Title from "../Common-use/Title";
import { Loading } from "react-loading-dot";

export default function Today() {
  const dayjs = require("dayjs");
  let now = dayjs().locale("pt-br");
  let today = now.format("dddd, DD/MM ");
  const [dailyHabit, setDailyhabit] = useState([]);
  const { user } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/habits/today`,
      config
    );
    promise.then((answer) => {
      setDailyhabit(answer.data);
    });
  }, [user.token]);

  useEffect(() => {
    updateTodayProgress(dailyHabit);
  }, [updateTodayProgress, dailyHabit]);

  function updateHabit(habit) {
    habit.done = !habit.done;
    setDailyhabit([...dailyHabit]);

    const body = "";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (habit.done) {
      checkHabit(habit, body, config);
    } else {
      uncheckHabit(habit, body, config);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateTodayProgress() {
    if (dailyHabit.length === 0) {
      setProgress(0);
      setLoading(false);
      return;
    }
    const percent = Math.round(
      (dailyHabit.filter((item) => item.done === true).length /
        dailyHabit.length) *
        100
    );
    setProgress(percent);
    setLoading(false);
  }

  function checkHabit(habit, body, config) {
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
    });
  }

  function uncheckHabit(habit, body, config) {
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
    });
  }

  return (
    <>
      <Header />
      <PageContent>
        <Day>
          <Title>{today}</Title>
          {loading ? (
            <Loading background="#9acd32" />
          ) : progress === 0 ? (
            <p>Nenhum hábito concluído ainda</p>
          ) : (
            <p>{progress}% dos hábitos concluídos</p>
          )}
        </Day>
        {dailyHabit.map((habit) => (
          <Routine key={habit.id}>
            <p>{habit.name}</p>
            <span>Sequência atual: {habit.currentSequence} dia(s)</span>
            <span>Seu recorde: {habit.highestSequence} dia(s)</span>
            <CheckSquare
              color={habit.done === true ? "#81b71a" : "#EBEBEB"}
              onClick={() => updateHabit(habit)}
            ></CheckSquare>
          </Routine>
        ))}
      </PageContent>
      <Footer />
    </>
  );
}
const Day = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 60px;
  justify-content: space-between;
  align-itens: center;
  margin-bottom: 20px;
  p {
    color: #bababa;
    font-size: 20px;
  }
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
