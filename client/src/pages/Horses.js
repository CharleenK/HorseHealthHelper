import { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";
import HorseAvatarUpload from "./ImageUpload";

// import {
//   MDBCard,
//   MDBCardImage,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardGroup,
// } from "mdb-react-ui-kit";

const Horses = () => {
  const { userData, setUserData } = useContext(UsersContext);
  // const cld = new Cloudinary({ cloud: { cloudName: "dypuqyvig" } });
  // const img = cld
  //   .image("")
  //   .format("auto")
  //   .quality("auto")
  //   .resize(auto().gravity(autoGravity()).width(50).height(50));
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userName")) {
      fetch(`/user/${localStorage.getItem("userName")}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
        });
    }
  }, []);
  const handleDeleteUser = (e, userName) => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(`/user/${userName}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.userRemoved) {
          localStorage.removeItem("userName");
          setUserData(null);
          navigate("/");
        } else {
          alert(data.error);
        }
      });
  };
  return (
    <StyledMain>
      <div>
        {/* <h1
          style={{
            textAlign: "center",
            color: "grey",
            marginTop: "50px",
            marginRight: "130px",
          }}
        >
          Image Upload in Cloudinary
        </h1>
        <div style={{ marginLeft: "50px", marginTop: "50px" }}>
          <HorseAvatarUpload
            imageUpload={handleImg}
            image={imageUpload.image}
          />
        </div> */}
      </div>
      {/* <StyledInnerDiv> */}
      {/* onSubmit={handlePhoneNumber} */}
      <StyledForm>
        {/* <StyledLabel htmlFor="phone">
          Veterinarian Emergency Number:
        </StyledLabel>
        <StyledInput
          // value={form.phone}
          // onChange={(e) => handleUpdate(e)}
          type="tel"
          name="phone"
          placeholder="Emergency Number"
        ></StyledInput>
        <button>Save</button> */}
      </StyledForm>
      {userData?.horses?.length ? (
        userData["horses"].map((horse) => {
          return (
            <>
              <p key={userData._id}>
                <StyledNavLink to={`/horseCare/${horse._id}`}>
                  {/* <AdvancedImage cldImg={img} /> */}
                  {horse.nickName}
                </StyledNavLink>
              </p>
            </>
          );
        })
      ) : (
        <p>No horses in your account yet</p>
        //should i write loading?
      )}
      {/* <div>Calendar:upcoming appointments</div> */}
      <StyledNavLink to="/addHorse">Add a new horse!</StyledNavLink>
      {/* </StyledInnerDiv> */}
      <button
        onClick={(e) => handleDeleteUser(e, localStorage.getItem("userName"))}
      >
        Delete My Account
      </button>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  color: #3b3214;
  justify-content: center;
  background-color: #5a6404;
  background-size: cover;
  font-family: Arial, sans-serif;
  padding-bottom: 0px;
  height: 100vh;
  width: 100vw;
  margin-top: -15vh;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: 2vw;
  margin-right: 2vw;
  margin-top: 12vh;
`;
// const StyledLabel = styled.label`
//   display: block;
//   text-shadow: 1px 1px 1px beige, 2px 2px 2px #5a6404;
//   width: 100%;
//   margin-top: 10px;
//   margin-bottom: 5px;
//   text-align: left;
//   font-weight: bold;
// `;
// const StyledInput = styled.input`
//   background-color: #5a6404;
//   border: 3px solid #3b3214;
//   border-radius: 15px;
//   color: beige;
//   cursor: pointer;
//   font-size: 1.5em;
//   padding: 15px;
// `;

const StyledNavLink = styled(NavLink)`
  background-color: #5a6404;
  color: beige;
  display: inline-block;
  border: 3px solid #3b3214;
  border-radius: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 15px;
  cursor: pointer;
  font-size: 1.5em;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    font-size: 125%;
    transition: 0.3s ease-in-out;
  }
  &.active {
    text-decoration: underline;
    color: #f1f738;
  }
`;

export default Horses;
