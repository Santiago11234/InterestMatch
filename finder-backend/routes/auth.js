import express from "express";
import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//works
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userId = uuidv4();

    
    const newUser = new User({
      userId,
      username,
      email,
      password,
      name: "Add your name here",
      profilePicture:
        "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
      interests: [
        {
          title: "Favorite Food",
          description: "Add the description of your favorite food here",
          imgUrl:
            "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
        },
        {
          title: "Hobby",
          description: "Add the description of your hobby here",
          imgUrl:
            "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
        },
        {
          title: "Favorite Vacation",
          description:
            "Add the description of your favorite vacation spot here",
          imgUrl:
            "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
        },
        {
          title: "Favorite Music",
          description: "Add the description of your favorite music genre here",
          imgUrl:
            "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
        },
        {
          title: "Your Job",
          description: "Add the description of your job here",
          imgUrl:
            "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
        },
      ],
      candidates: [],
      pairs: [],
      requests: [],
      conversations: [],
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});
//works
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", userId: user.userId });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

//works
router.get("/get-candidates/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }).populate("candidates").exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user.candidates);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//works
router.post("/add-candidate/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { candidateId } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const candidateUser = await User.findOne({ userId: candidateId });
    if (!candidateUser) {
      return res.status(404).json({ error: "Candidate user not found" });
    }
    if (!user.candidates.includes(candidateUser)) {
      user.candidates.push(candidateUser._id);
      await user.save();
    }

    res.status(201).json({ message: "Candidate added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding candidate" });
  }
});

//works
router.post("/add-interest/:userId", async (req, res) => {
  const { userId } = req.params;
  const { title, description, imgUrl } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          interests: {
            title,
            description,
            imgUrl,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({ message: "Interest added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding interest" });
  }
});

//works
router.get("/get-interests/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId }).populate("interests").exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user.interests);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//works
router.put("/set-interest/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { index, title, description, imgUrl } = req.body;

    if (index < 0 || index >= user.interests.length) {
      return res.status(400).json({ error: "Invalid interest index" });
    }

    user.interests[index].title = title;
    user.interests[index].description = description;
    user.interests[index].imgUrl = imgUrl;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser.interests[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating interest" });
  }
});

//works
router.put("/set-profile-picture-and-name/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, imgUrl } = req.body;
    user.name = name;
    user.profilePicture = imgUrl;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
});

//works
router.get("/get-profile-picture-and-name/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId }).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// works
router.delete("/delete-candidate/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { isPair, candidateId } = req.body;
    const user = await User.findOne({ userId });
    const candidateUser = await User.findOne({ userId: candidateId });

    if (!user || !candidateUser) {
      return res.status(404).json({ error: "User(s) not found" });
    }

    user.candidates.pull(candidateUser._id);
    candidateUser.candidates.pull(user._id);
    await candidateUser.save();

    if (isPair && !user.requests.includes(candidateUser._id) ) {
      user.requests.push(candidateUser._id);
    }

    await user.save();

    res.status(200).json({ message: "Candidate deleted successfully." });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting candidate." });
  }
});

// works
router.put("/add-request/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { candidateId } = req.body;
    const user = await User.findOne({ userId });
    const candidateUser = await User.findOne({ candidateId });

    if (!user.requests.includes(candidateUser._id)) {
      user.requests.push(candidateUser._id);
      await user.save();
    } else {
      console.log("Candidate already in requests list.");
    }

    res
      .status(200)
      .json({ message: "Candidate added to requests list successfully." });
  } catch (error) {
    console.error("Error adding candidate to requests list:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while adding candidate to requests list.",
      });
  }
});

//works
router.get("/get-requests/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId }).populate("requests").exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user.requests);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//works
router.delete("/delete-request/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { isPair, candidateId } = req.body;
    const user = await User.findOne({ userId });
    const candidateUser = await User.findOne({ userId: candidateId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
   

    if (isPair) {
      const conversation = new Conversation({
        conversationId: new mongoose.Types.ObjectId(),
        pair: [user, candidateUser],
        messages: [],
      });

      await conversation.save();

      user.conversations.push(conversation);
      user.pairs.push(candidateUser);
      await user.save();

      candidateUser.conversations.push(conversation);
      candidateUser.pairs.push(user);
      await candidateUser.save();

      user.requests.pull(candidateUser._id);
      await user.save();
    }

    res.status(200).json({ message: "Candidate deleted successfully." });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting candidate." });
  }
});

//works
router.get("/get-pairs/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId }).populate("pairs").exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user.pairs);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//works
router.put("/add-pair/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { candidateId } = req.body;

    const user = await User.findOne({ userId });
    const candidateUser = await User.findOne({ userId: candidateId });

    if (!user || !candidateUser) {
      return res.status(404).json({ error: "User(s) not found" });
    }

    const conversation = new Conversation({
      _id: new mongoose.Types.ObjectId(),
      pair: [senderUser, receiverUser],
      messages: [
        {
          sender: senderUser.userId,
          content: content,
        },
      ],
    });

    user.pairs.push(candidateUser._id);
    user.conversations.push(conversation._id);
    await user.save();

    candidateUser.pairs.push(user._id);
    candidateUser.conversations.push(conversation._id);
    await candidateUser.save();

    res
      .status(200)
      .json({ message: "Candidate added to pairs list successfully." });
  } catch (error) {
    console.error("Error adding candidate to pairs list:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while adding candidate to pairs list.",
      });
  }
});

//works
router.post("/send-message/:userId/:pairId", async (req, res) => {
  try {
    const { userId, pairId } = req.params;
    const { content, conversationId } = req.body;

    const senderUser = await User.findOne({ userId });

    const receiverUser = await User.findOne({ userId: pairId });

    let conversation = await Conversation.findOne({ conversationId });

    if (!conversation) {
      conversation = new Conversation({
        conversationId: conversationId,
        pair: [senderUser, receiverUser],
        messages: [],
      });

      await conversation.save();
    }

    conversation.messages.push({
      sender: senderUser,
      content: content,
      timestamp: Date.now(),
    });

    await conversation.save();

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ error: "User(s) not found" });
    }

    senderUser.save();
    receiverUser.save();

    // failed push user to top code
    // const user = await User.findOne({ userId });
    // const pairsList = user.pairs;


    // const pairIndex = pairsList.findIndex((pair) => pair.equals(receiverUser._id));
    // if (pairIndex > 0) {
    //   pairsList.splice(pairIndex, 1);
    //   pairsList.unshift(receiverUser._id);
    //   user.pairs = pairsList;
    //   await user.save();
    // }

    res.status(200).json({
      message: "Message sent successfully",
      newMessage: {
        sender: senderUser,
        content: content,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the message" });
  }
});

//works
router.get("/get-messages/:userId/:pairId", async (req, res) => {
  try {
    const {  userId, pairId } = req.params;

    const user = await User.findOne({ userId });
    const pair = await User.findOne({ userId: pairId });
    
    const conversation = await Conversation.findOne({
      pair: { $all: [user, pair] }
    }).populate("pair messages.sender");

    
    if (conversation === undefined) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "An error occurred while getting messages" });
  }
});

export default router;

