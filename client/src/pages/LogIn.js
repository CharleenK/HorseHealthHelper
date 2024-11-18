import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import styled from "styled-components";
//import useontext and check if userdata exists=== don't show log in ***ex. import horses component if logged in
const LogIn = () => {
  const { setUserData } = useContext(UsersContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("userName:", userName, "password:", password);
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: userName, password: password }),
    };
    //log in with wrong name?return to home
    fetch("/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("userName", data.data.userName);
          setUserData(data.data);
          console.log(data);
          navigate("/horses");
        } else {
          alert(data.error);
        }
      });
  };
  return (
    <StyledOuterDiv>
      <StyledForm onSubmit={handleLogin}>
        <StyledLabel htmlFor="first">Username:</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Enter your Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        ></StyledInput>
        <StyledLabel htmlFor="password"> Password:</StyledLabel>
        <StyledInput
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></StyledInput>
        <StyledButton disabled={password === "" || userName === ""}>
          Log In
        </StyledButton>
        <div>
          <StyledP>Not registered?</StyledP>
          <StyledNavLink2 to="/accountCreation">
            Create an account
          </StyledNavLink2>
        </div>
      </StyledForm>
    </StyledOuterDiv>
  );
};

const StyledOuterDiv = styled.div`
  color: #3b3214;
  position: relative;
  top: 20px;
  background-color: #ffffff20;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 0px 8px;
`;
const StyledForm = styled.form`
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  // margin-left: 2vw;
  // margin-right: 2vw;
`;
const StyledLabel = styled.label`
  display: block;
  text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: left;
  font-weight: bold;
`;
const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  border: 2px solid #5a6404;
  border-radius: 5px;
  font-size: 0.75em;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  cursor: pointer;
`;
const StyledButton = styled.button`
  color: white;
  background-color: #5a6404;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.75em;
  margin-top: 15px;
  margin-bottom: 0px;
  padding: 6px;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 125%;
    transition: 0.3s ease-in-out;
  }
  &.active {
    text-decoration: underline;
    color: #5a6404;
  }
`;
const StyledP = styled.p`
  font-weight: bold;
  text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
  font-size: 1em;
  margin-bottom: 0px;
`;
const StyledNavLink2 = styled(NavLink)`
  color: #3b3214;
  font-weight: bold;
  text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
  text-decoration: none;
  cursor: pointer;
  padding: 0px;
  margin-bottom: -5vh;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 125%;
    transition: 0.3s ease-in-out;
  }
`;
export default LogIn;
