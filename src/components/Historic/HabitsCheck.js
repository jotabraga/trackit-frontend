import styled from "styled-components";
import { CheckmarkOutline } from "react-ionicons";
import { CloseOutline } from "react-ionicons";

export default function HabitsCheck({ habitName, done }) {
  return (
    <>
      {/* <AllHabits>
        <Done state={done}>
          <h3>• {habitName}</h3>
          <p>{done ? "Hábito concluído!" : "Hábito não concluído"}</p>
        </Done>
        <Check state={done}>
          {done ? (
            <CheckmarkOutline color={"#fff"} height="30px" width="30px" />
          ) : (
            <CloseOutline color={"#fff"} height="30px" width="30px" />
          )}
        </Check>
      </AllHabits> */}
    </>
  );
}

const Done = styled.div`
  margin-top: 0px !important;
  padding: 0px !important;
  p {
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
    color: ${(props) => (props.state ? "#8FC549" : "#666")};
    margin: 5px;
  }
  h3 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #000;
  }
`;

const Check = styled.div`
  margin-top: 5px !important;
  padding: 20px !important;
  width: 30px !important;
  height: 30px;
  background-color: ${(props) =>
    props.state ? "#8FC549" : "#CFCFCF"}!important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AllHabits = styled.div`
  margin-top: 0px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px !important;
  margin-bottom: 10px !important;
`;