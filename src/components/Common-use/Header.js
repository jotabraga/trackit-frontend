import styled from "styled-components";
import UserContext from "../../Contexts/UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <StyledHeader>
      <h1>TrackIt</h1>
      <img src={user.image} alt={user.name} />
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
  background-color: #000;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, #734ea0 0%, #2300d1 100%);
  border-image-slice: 1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  z-index: 2;
  h1 {
    font-family: "Playball", cursive;
    font-size: 40px;
    background: -webkit-linear-gradient(#5f9700, #a0e025);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  img {
    border-radius: 50%50%;
    height: 51px;
    width: 51px;
    margin-right: 20px;
    border: 2px solid #2300d1;
  }
`;
