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

export default function Historic() {
  const { user } = useContext(UserContext);
  const [historic, setHistoric] = useState([]);
  const days = historic.map((d) => d.day);
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(false);

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
  }, []);

  return (
    <>
      <Header />
      <Title>Histórico</Title>
      <StyledCalendar
        onChange={setDate}
        value={date}
        locale="pt-br"
        calendarType="US"
        onClickDay={(value, event) => {
          clickWeekday(days, value, setSelected, historic);
        }}
        tileClassName={({ date, view }) => highlightedDay(days, date, historic)}
      />
      <CalendarClick
        state={state}
        setstate={setstate}
        information={information}
      />
      <Div />
      <Footer />
    </>
  );
  function clickWeekday(days, value, setState, items, setInfomation) {
    if (days.find((x) => x === dayjs(value).format("DD/MM/YYYY"))) {
      setState(true);
      let chosen = [];
      chosen = items.find(
        (item, i) => item.day === dayjs(value).format("DD/MM/YYYY")
      );
      let habitChosen = [];

      for (let i = 0; i < chosen.habits.length; i++) {
        habitChosen.push({
          name: chosen.habits[i].name,
          done: chosen.habits[i].done,
        });
      }

      setInfomation([dayjs(value).format("DD/MM/YYYY"), habitChosen]);
    }
  }

  function highlightedDay(days, date, items) {
    let habit = [];
    let doneHabit = [];

    if (days.find((x) => x === dayjs(date).format("DD/MM/YYYY"))) {
      if (dayjs(date).format("DD/MM/YYYY") === now) {
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
    margin-top: 15px;
    width: 90%;

  .false {
    background-color: #ea5766;
    border-radius: 50%;
  }

  .true {
    background-color: #8cc654;
    border-radius: 50%;
  }

  .today {
    background-color: #fcee81;
    color: black;
  }
`;
