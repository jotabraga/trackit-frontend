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
        <CircularProgressbar
          value={progress}
          text={"Hoje"}
          background
          backgroundPadding={6}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "18px",
            pathTransitionDuration: 0.5,
            transition: "stroke-dashoffset 0.5s ease 0s",
            pathColor: `#fff`,
            textColor: "#FFFFFF",
            trailColor: "#bebebe",
            backgroundColor: "#52B6FF",
          })}
        />
      </div>
      <p>Histórico</p>
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
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-family: "Lexend Deca", sans-serif;
    color: #52b6ff;
    font-size: 18px;
  }
  .BarContainer {
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
    border-radius: 50%;
    background-color: #52b6ff;
    font-family: "Lexend Deca", sans-serif;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
  }
`;
