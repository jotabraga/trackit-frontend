import styled from "styled-components";
import Header from "../Common-use/Header";
import Footer from "../Common-use/Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import dayjs from "dayjs";
import axios from "axios";
import Title from "../Common-use/Title";
import CalendarClick from "./CalendarClick";

export default function Historic() {
  const { user } = useContext(UserContext);
  const [historic, setHistoric] = useState([]);
  const registeredDays = historic.map((d) => d.day);
  const today = dayjs().format("DD/MM/YYYY");
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(false);
  const [dayHabits, setDayhabits] = useState([]);

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/habits/history/daily`,
      config
    );
    request.then((answer) => {
      setHistoric(answer.data);
    });
    request.catch(() => alert("Erro de servidor, tente novamente"));
  }, [user.token]);

  return (
    <>
      <Header />
      <Title>Histórico</Title>
      <CalendarContainer>
        <StyledCalendar
          onChange={setDate}
          value={date}
          locale="pt-br"
          calendarType="US"
          onClickDay={(value) => {
            seeHabitsDay(registeredDays, value, setSelected, setDayhabits);
          }}
          tileClassName={({ date }) =>
            highlightedDay(registeredDays, date, historic)
          }
        />
        <CalendarClick
          selected={selected}
          setSelected={setSelected}
          dayHabits={dayHabits}
        />
      </CalendarContainer>
      <Footer />
    </>
  );
  function seeHabitsDay(registeredDays, value, setSelected, setDayhabits) {
    if (registeredDays.find((x) => x === dayjs(value).format("DD/MM/YYYY"))) {
      setSelected(true);
      let chosen = [];
      chosen = historic.find(
        (item) => item.day === dayjs(value).format("DD/MM/YYYY")
      );
      let habitChosen = [];

      for (let i = 0; i < chosen.habits.length; i++) {
        habitChosen.push({
          name: chosen.habits[i].name,
          done: chosen.habits[i].done,
        });
      }

      setDayhabits(habitChosen);
    }
  }

  function highlightedDay(registeredDays, date, items) {
    let habit = [];
    let doneHabit = [];

    if (registeredDays.find((x) => x === dayjs(date).format("DD/MM/YYYY"))) {
      if (dayjs(date).format("DD/MM/YYYY") === today) {
        return "today";
      } else {
        for (let i = 0; i < items.length; i++) {
          if (items[i].day === dayjs(date).format("DD/MM/YYYY"))
            habit = items[i].habits;
          for (let j = 0; j < habit.length; j++) {
            doneHabit.push(habit[j].done);
          }
        }
        return `${doneHabit.reduce((acc, item) => acc && item, true)}`;
      }
    }
  }
}

const StyledCalendar = styled(Calendar)`
  border-radius: 10px;
  border: 0px;
  margin: auto;
  width: 90%;
  .false {
    background-color: #ea5766;
  }
  .true {
    background-color: #8cc654;
  }
  .today {
    background-color: #fcee81;
    color: black;
  }
`;

const CalendarContainer = styled.div`
  height: calc(100vh - 140px);
  background: #080808;
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
