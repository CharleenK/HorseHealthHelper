import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/addHorse.css";
import HorseAvatarUpload from "./ImageUpload";
import { sha1 } from "js-sha1";

//context: for userName
const AddHorse = () => {
  const [logo, setLogo] = useState("");
  const [imageUpload] = useState({});
  const [, setImg] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [registeredName, setRegisteredName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState("");
  //get user name from local storage get item method***
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleNewHorse = (e) => {
    e.preventDefault();
    console.log("nickName:", nickName, "breed:", breed, "color:", color);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        nickName: nickName,
        registeredName: registeredName,
        dateOfBirth: dateOfBirth,
        sex: sex,
        breed: breed,
        color: color,
        height: height,
      }),
    };

    fetch("/addHorse", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/horses");
      });
  };
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      setLogo(e.target.files[0]);
    }
  };
  const profileUpload = async (file) => {
    const formData = new FormData();
    let signature = sha1(
      `public_id=${"horse"}&timestamp=${Date.now()}${"RQApeM2nOA68ygumqe-raDOmPHg"}`
    );
    formData.append("file", file);
    formData.append("upload_preset", "gemni99z");
    formData.append("cloud_name", "dypuqyvig");

    fetch("https://api.cloudinary.com/v1_1/dypuqyvig/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadedImage(data.secure_url);
        alert("upload successful");
      });
  };
  const handleSubmit = async (e) => {
    imageUpload.image = logo;
    await profileUpload(logo);
  };
  return (
    <>
      <StyledMain>
        <div className="addHorse-background">
          <StyleddivP>
            <HorseAvatarUpload
              imageUpload={handleImg}
              image={imageUpload.image}
            />
          </StyleddivP>
          <div
            style={
              {
                // marginLeft: "10px",
                // marginBottom: "50px",
                // marginTop: "-135px",
                // borderRadius: "25px",
                // fontFamily: "arial",
              }
            }
          >
            <StyledButton
              type="submit"
              color="primary"
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </StyledButton>
          </div>
          <StyledForm onSubmit={handleNewHorse}>
            <Styleddiv1>
              <StyledLabel htmlFor="nickName">Nick Name:</StyledLabel>
              <StyledInput
                type="text"
                id="NickName"
                name="NickName"
                placeholder="Enter your horse's nick name"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
              ></StyledInput>
              <StyledLabel htmlFor="registeredName">
                Registered Name:
              </StyledLabel>
              <StyledInput
                type="text"
                id="RegisteredName"
                name="RegisteredName"
                placeholder="Enter your horse's Registered Name"
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
                required
              ></StyledInput>
              <StyledLabel htmlFor="dateOfBirth">Date of Birth:</StyledLabel>
              <StyledInput
                type="date"
                id="DateOfBirth"
                name="DateOfBirth"
                placeholder="Enter your horse's date of birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              ></StyledInput>
              <StyledLabel htmlFor="sex">Sex:</StyledLabel>
              <StyledInput
                type="text"
                id="Sex"
                name="Sex"
                placeholder="Enter your horse's sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              ></StyledInput>
            </Styleddiv1>
            <Styleddiv2>
              <StyledLabel htmlFor="breed">Breed:</StyledLabel>
              <StyledInput
                type="text"
                id="Breed"
                name="Breed"
                placeholder="Enter your horse's breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              ></StyledInput>
              <StyledLabel htmlFor="color">color:</StyledLabel>
              <StyledInput
                type="text"
                id="Color"
                name="Color"
                placeholder="Enter your horse's Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              ></StyledInput>
              <StyledLabel htmlFor="height">Height:</StyledLabel>
              <StyledInput
                type="text"
                id="height"
                name="height"
                placeholder="Enter your horse's height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              ></StyledInput>
              <StyledButton
                disabled={
                  nickName === "" ||
                  registeredName === "" ||
                  dateOfBirth === "" ||
                  sex === "" ||
                  breed === "" ||
                  color === "" ||
                  height === ""
                }
              >
                Add My Horse
              </StyledButton>
            </Styleddiv2>
          </StyledForm>
        </div>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  color: #3b3214;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90%;
  width: 95%;
  margin-right: 15vh;
  padding: 3vh;
`;
const StyleddivP = styled.div`
  color: white;
  background-color: #5a6404;
  border: 3px solid #3b3214;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 0px;
  padding: 10px;
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

const Styleddiv1 = styled.div`
  margin-right: 25px;
  margin-left: -10vw;
`;
//need @media querry to change input size and location when using a smaller screen
const Styleddiv2 = styled.div`
  margin-right: -10vw;
  min-width: 255px;
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
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 3px solid #3b3214;
  border-radius: 5px;
`;
const StyledButton = styled.button`
  color: white;
  background-color: #5a6404;
  border: 3px solid #3b3214;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 0px;
  padding: 10px;
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

export default AddHorse;
