import { useEffect, useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
//beware of logout, clear local storage and clear userdata(set to null)

const NavBar = () => {
  const { userData, setUserData } = useContext(UsersContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("userName");
    setUserData(null);
    navigate("/");
  };
  const horses = () => {
    navigate("/horses");
  };
  return (
    <>
      <NavContainer>
        <StyledDiv>
          <StyledH1>HORSE HEALTH HELPER</StyledH1>
          {userData && <StyledButton onClick={logOut}>Log Out</StyledButton>}
          {userData && <StyledButton onClick={horses}>Horses</StyledButton>}
        </StyledDiv>
      </NavContainer>
    </>
  );
};
const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
  position: relative;
  top: 10px;
  color: #3b3214;
  font-size: 1.25em;
  margin-bottom: -8vh;
  padding: 0px;
  z-index: 25;
`;
const StyledDiv = styled.div`
  margin: 0px;
  padding: 0px;
`;
const StyledH1 = styled.h1`
  margin: 0px;
  padding: 0px;
`;
const StyledButton = styled.button`
  background-color: #5a6404;
  color: beige;
  border: 3px solid #3b3214;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.5em;
  text-decoration: none;
  margin-top: 25px;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 125%;
    transition: 0.3s ease-in-out;
  }
`;

export default NavBar;
