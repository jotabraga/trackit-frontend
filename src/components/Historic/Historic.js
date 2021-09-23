import styled from "styled-components";
import Header from "../Common-use/Header";
import Footer from "../Common-use/Footer";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import axios from "axios";

export default function Historic() {

    const { user } = useContext(UserContext);

    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

}