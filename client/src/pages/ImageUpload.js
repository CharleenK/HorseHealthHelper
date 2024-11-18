import { Avatar, Button as MuiButton } from "@material-ui/core";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UploadIcon from "@mui/icons-material/Upload";
// import { spacing } from "@material-ui/system";
import React, { createRef, useState } from "react";
import styled from "styled-components";

const HorseAvatarUpload = (props) => {
  const [image, setImage] = useState();
  const inputFileRef = createRef();
  const cleanup = () => {
    URL.revokeObjectURL(image && props.image);
    inputFileRef.current.value = null;
  };
  const setImageState = (newImage) => {
    if (image) {
      cleanup();
    }
    setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImageState(URL.createObjectURL(newImage));
    }
    props.imageUpload(event);
  };
  return (
    <CenteredContent>
      <BigAvatar
        alt="Avatar"
        src={image}
        style={{ width: "110px", borderRadius: "50%", height: "100px" }}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        {/* <Button
          color="primary"
          component="span"
          style={{
            marginBottom: "100px",
            width: "130px",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {image ? "Uploaded" : "Upload"}
        </Button> */}
      </label>
    </CenteredContent>
  );
};

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  margin-left: 40%;
  border: 1px solid grey;
  margin-top: 10%;
  box-shadow: 1px 1px 15px -5px black;
`;
export default HorseAvatarUpload;
