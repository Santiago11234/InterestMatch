import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../../Services/axios";
import { storage } from "../../../Services/FirebaseContext";
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../ProfilePage.module.css";


const PersonalInfo = ({ userId }) => {
  const [name, setName] = useState("");
  const [editedName, setEditedName] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editedImgUrl, setEditedImgUrl] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchInterests() {
      console.log(userId);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/get-profile-picture-and-name/${userId}`
        );
        setEditedName(response.data.name);
        setEditedImgUrl(response.data.profilePicture);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    }
    if (userId) {
      fetchInterests();
    }
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
    setName(editedName);
    setImgUrl(editedImgUrl);
  };

  const handleFinishEdit = async () => {
    try {
      

        console.log(editedImgUrl)
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}user/set-profile-picture-and-name/${userId}`,
        {
          name: editedName,
          imgUrl: editedImgUrl,
        }
      );
      setEditMode(false);
      setEditedImgUrl(imgUrl);


    } catch (error) {
      console.error("Error updating interest:", error);
    }
  };

  const handleImageEditClick = () => {
    setOpenImageDialog(true);
    setSelectedImage(null);
  };

  const handleImageSelect = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImage(selectedFile);
  };

  const handleImageSave = async () => {
    if (selectedImage) {
      try {
        const imageName = `${Date.now()}_${selectedImage.name}`;
        const imageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);
        setEditedImgUrl(imageUrl);
  
        try {
          await axios.put(
            `${process.env.REACT_APP_API_URL}user/set-profile-picture-and-name/${userId}`,
            {
              name: editedName,
              imgUrl: imageUrl,
            }
          );
        } catch (error) {
          console.error("Error updating image URL in the database:", error);
        }
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
      }
    }
    setOpenImageDialog(false);
  };
  

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <div>
      <Card className={styles.profileCardContainer}>
        <CardHeader
          className={styles.cardHeader}
          style={{ backgroundColor: "red", position: "relative" }}
          action={
            <IconButton onClick={editMode ? handleFinishEdit : handleEditClick} style={{color: "white"}}>
              {editMode ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          }
        />
        <div className={styles.profileCardImageContainer}>
          <div
            className={`${styles.profileCardImage} ${editMode && styles.editModeImage}`}
            onClick={editMode ? handleImageEditClick : null}
          >
            <CardMedia
              component="img"
              alt={user.name}
              height="140"
              image={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : editMode
                  ? editedImgUrl
                  : user.profilePicture
              }
              style={{ borderRadius: "50%" }}
            />
            {editMode && (
              <div className={styles.editImageOverlay} style={{borderRadius: '100%'}}>
                Edit Image
              </div>
            )}
          </div>
        </div>
        <CardContent className={styles.profileCardContent}>
          <Typography variant="h6" align="center" className="profileCardName">
            {editMode ? (
              <TextField
               
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                inputProps={{ style: { color: "black", fontSize: "1.25rem" } }}
              />
            ) : (
              editedName
            )}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImageSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PersonalInfo;
