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
import styles from "./ProfilePage.module.css";
import axios from "../../Services/axios";
import { storage } from "../../Services/FirebaseContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TinderCard from "react-tinder-card";

const ProfilePageCard = ({ userId, index, color }) => {
  const [interests, setInterests] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImgUrl, setEditedImgUrl] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchInterests() {
      console.log(userId);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/get-interests/${userId}`
        );
        setInterests(response.data);
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
    setEditedTitle(interests[index]?.title);
    setEditedDescription(interests[index]?.description);
    setEditedImgUrl(interests[index]?.imgUrl);
  };

  const handleFinishEdit = async () => {
    try {
      console.log(editedImgUrl)
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/set-interest/${userId}`,
        {
          index,
          title: editedTitle,
          description: editedDescription,
          imgUrl: editedImgUrl, 
        }
      );
      setInterests((prevInterests) =>
        prevInterests.map((interest, i) =>
          i === index
            ? {
                ...interest,
                title: editedTitle,
                description: editedDescription,
                imgUrl: editedImgUrl, 
              }
            : interest
        )
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating interest:", error);
    }
  };
  

  const handleImageEditClick = () => {
    setOpenImageDialog(true);
    setSelectedImage(null);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
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

      } catch (error) {
        console.error('Error uploading image to Firebase:', error);
      }
    }
    setOpenImageDialog(false);
  };

  return (
    <div className={styles.cardContainer}>
      <Card>
        <CardHeader
          className={styles.cardHeader}
          style={{ backgroundColor: color }}
          title={
            editMode ? (
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                inputProps={{ style: { color: "white", fontSize: "1.25rem" } }}
              />
            ) : (
              <Typography variant="h6">{interests[index]?.title}</Typography>
            )
          }
          action={
            <IconButton onClick={editMode ? handleFinishEdit : handleEditClick}>
              {editMode ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          }
        />
        <CardContent className={styles.cardContent}>
          <div className={styles.cardDescription}>
            {editMode ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <Typography variant="body1">
                {interests[index]?.description}
              </Typography>
            )}
          </div>
          <div
            className={`${styles.cardImage} ${
              editMode && styles.editModeImage
            }`}
            onClick={editMode ? handleImageEditClick : null}
          >
            <CardMedia
              component="img"
              alt={editedTitle}
              height="140"
              image={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : editMode
                  ? editedImgUrl
                  : interests[index]?.imgUrl
              }
              style={{ borderRadius: "7px" }}
            />
            {editMode && (
              <div className={styles.editImageOverlay}>
                Edit Image 
                <br/>
                Must Be PNG
              </div>
            )}
          </div>
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
              
      {/* Preview*/}
      <div className={styles.tinderCards__cardContainer}  >
    
        <TinderCard
          key={userId}
          className={styles.tinderCards__swipe}
          preventSwipe={["up", "down", "left", "right"]}
        >
          <div
            className={styles.tinderCards__card}
            style={{
              backgroundImage: `url(${
                interests[index]?.imgUrl ||
                ""
              })`,
            }}
          >
            <div className={styles.tinderCards__top__shadow}>
              <h3>{"Your Name" || ""}</h3>
            </div>
            <div className={styles.tinderCards__left__shadow}>
              <h3>
                {interests[index]?.title || ""}
              </h3>
              <div className={styles.tinderCards__description}>
                <p>
                  {interests[index]?.description ||
                    ""}
                </p>
              </div>
            </div>
          </div>
        </TinderCard>
     
    </div>
   
    </div>
  );
};

export default ProfilePageCard;
