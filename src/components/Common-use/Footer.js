import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useContext } from "react";
import ProgressContext from "../../Contexts/ProgressContext";

export default function Footer() {
  const { progress } = useContext(ProgressContext);

  return (
    <StyledFooter>
      <Link to="/habitos">
        <p>Hábitos</p>
      </Link>
      <div className="BarContainer">
        <Link to="/hoje">
          {/* <CircularProgressbar
            value={progress}
            text={"Hoje"}
            background
            backgroundPadding={6}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "18px",
              pathTransitionDuration: 0.5,
              transition: "stroke-dashoffset 0.5s ease 0s",
              pathColor: `#81b71a`,
              textColor: "#FFFFFF",
              trailColor: "#6f7660",
              backgroundColor: "#111111",
            })}
          />
        </Link> */}
      </div>
      <Link to="/historico">
        <p>Histórico</p>
      </Link>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 0 36px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-family: "Lexend Deca", sans-serif;
    color: #81b71a;
    font-size: 18px;
  }
  .BarContainer {
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
    border-radius: 50%;
    background-color: #696969;
    font-family: "Lexend Deca", sans-serif;
    color: #81b71a;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
  }
`;
