import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import styled from "styled-components";

const CreateUser = () => {
  const { setUserData } = useContext(UsersContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (email) => {
    setEmail(email);
    let emailVerification = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    setValidEmail(
      emailVerification &&
        typeof emailVerification === "object" &&
        emailVerification.length
    );
  };
  const handleNewUser = (e) => {
    e.preventDefault();
    console.log(
      "UserName:",
      userName,
      "NewUser email:",
      email,
      "password:",
      password
    );
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
      }),
    };
    // fetch("/createUser", options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     navigate("/horses");
    //   });
    fetch("/createUser", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          localStorage.setItem("userName", userName);
          setUserData(data.data);
          console.log(data);
          navigate("/horses");
        } else {
          alert(data.error);
        }
      });
  };

  return (
    <>
      <StyledOuterDiv>
        <StyledForm onSubmit={handleNewUser}>
          <h2>Create An Account</h2>
          <StyledLabel htmlFor="userName">Username:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          ></StyledInput>
          <StyledLabel htmlFor="email"> Email:</StyledLabel>
          <StyledInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            invalid={validEmail}
          ></StyledInput>
          <StyledLabel htmlFor="password"> Password:</StyledLabel>
          <StyledInput
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></StyledInput>
          <StyledLabel htmlFor="password"> Password Confirmation:</StyledLabel>
          <StyledInput
            type="password"
            placeholder="Confirm your password"
            required
          ></StyledInput>
          <StyledButton disabled={!validEmail}>Create My Account</StyledButton>
        </StyledForm>
      </StyledOuterDiv>
    </>
  );
};
const StyledOuterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b3214;
  position: relative;
  top: 30px;
  background-color: #5a6404;
  background-size: cover;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  height: 70vh;
  width: 65%;
  margin-top: 25vh;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2vh;
  padding: 2vh;
`;
const StyledLabel = styled.label`
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: left;
  font-weight: bold;
`;
const StyledInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #5a6404;
  border-radius: 5px;
`;
const StyledButton = styled.button`
  color: white;
  background-color: #5a6404;
  border: none;
  border-radius: 10px;
  cursor: pointer;
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

export default CreateUser;
