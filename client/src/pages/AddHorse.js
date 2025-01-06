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
        image: uploadedImage,
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
            <StyledButtonA
              type="submit"
              color="primary"
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </StyledButtonA>
          </StyleddivP>
          <StyledForm onSubmit={handleNewHorse}>
            <Styleddiv1>
              <StyledLabelA htmlFor="nickName">Nick Name:</StyledLabelA>
              <StyledInputA
                type="text"
                id="NickName"
                name="NickName"
                placeholder="Enter your horse's nick name"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
              ></StyledInputA>
              <StyledLabelA htmlFor="registeredName">
                Registered Name:
              </StyledLabelA>
              <StyledInputA
                type="text"
                id="RegisteredName"
                name="RegisteredName"
                placeholder="Enter your horse's Registered Name"
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
                required
              ></StyledInputA>
              <StyledLabelA htmlFor="dateOfBirth">Date of Birth:</StyledLabelA>
              <StyledInputA
                type="date"
                id="DateOfBirth"
                name="DateOfBirth"
                placeholder="Enter your horse's date of birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              ></StyledInputA>
              <StyledLabelA htmlFor="sex">Sex:</StyledLabelA>
              <StyledInputA
                type="text"
                id="Sex"
                name="Sex"
                placeholder="Enter your horse's sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              ></StyledInputA>
            </Styleddiv1>
            <Styleddiv2>
              <StyledLabelB htmlFor="breed">Breed:</StyledLabelB>
              <StyledInputB
                type="text"
                id="Breed"
                name="Breed"
                placeholder="Enter your horse's breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              ></StyledInputB>
              <StyledLabelB htmlFor="color">color:</StyledLabelB>
              <StyledInputB
                type="text"
                id="Color"
                name="Color"
                placeholder="Enter your horse's Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              ></StyledInputB>
              <StyledLabelB htmlFor="height">Height:</StyledLabelB>
              <StyledInputB
                type="text"
                id="height"
                name="height"
                placeholder="Enter your horse's height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              ></StyledInputB>
              <StyledButtonB
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
              </StyledButtonB>
            </Styleddiv2>
          </StyledForm>
        </div>
        <figcaption class="img-caption">
          Photo from
          <a href="https://unsplash.com/photos/three-brown-and-black-horses-running-in-open-green-field-at-daytime-gGG7NHbzeGg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Florin Beudean
          </a>
        </figcaption>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.div`
  margin-top: -14.5vh;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  width: 98%;
  z-index: 1;
  // border: 2px solid red;
`;
const StyleddivP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  color: white;
  background-color: #ffffff20;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-top: -40vh;
  padding: 10px 0px;
  width: 22%;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  z-index: 2;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 105%;
    transition: 0.3s ease-in-out;
  }
  &.active {
    text-decoration: underline;
    color: #5a6404;
  }
`;
const Styleddiv1 = styled.div`
  min-width: 37%;
`;
//need @media querry to change input size and location when using a smaller screen
const Styleddiv2 = styled.div`
  min-width: 37%;
`;
const StyledLabelA = styled.label`
  display: block;
  text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: left;
  font-weight: bold;
`;
const StyledLabelB = styled.label`
  display: block;
  text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 3.5vw;
  text-align: left;
  font-weight: bold;
`;

const StyledInputA = styled.input`
  display: block;
  min-width: 91%;
  margin-bottom: 15px;
  padding: 10px 30px;
  box-sizing: border-box;
  border: 3px solid #3b3214;
  border-radius: 5px;
`;
const StyledInputB = styled.input`
  display: block;
  min-width: 91%;
  margin-bottom: 15px;
  padding: 10px 30px;
  box-sizing: border-box;
  border: 3px solid #3b3214;
  border-radius: 5px;
  float: right;
`;
const StyledButtonA = styled.button`
  color: white;
  background-color: #5a6404;
  border: 3px solid #3b3214;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 105%;
    transition: 0.3s ease-in-out;
  }
  &.active {
    text-decoration: underline;
    color: #5a6404;
  }
`;
const StyledButtonB = styled.button`
  color: white;
  background-color: #5a6404;
  border: 3px solid #3b3214;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;
  margin-bottom: 0px;
  float: right;
  padding: 10px;
  text-decoration: none;
  min-width: 91%;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 105%;
    transition: 0.3s ease-in-out;
  }
  &.active {
    text-decoration: underline;
    color: #5a6404;
  }
`;

export default AddHorse;
