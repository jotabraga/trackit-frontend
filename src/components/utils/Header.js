import styled from "styled-components";
import UserContext from "../../Contexts/UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
  const { image, name } = user;

  return (
    <StyledHeader>
      <p>TrackIt</p>
      <div className="circle">
        <img src={image} alt={name} />
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  z-index: 2;
  h1 {
    font-family: "Playball", cursive;
    font-size: 40px;
    color: #fff;
  }
  img {
    border-radius: 50%50%;
    height: 51px;
    width: 51px;
  }
  .circle {
    background-color: #fff;
    border-radius: 50%;
    width: 51px;
    height: 51px;
    overflow: hidden;
    position: relative;
  }
  img {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;


