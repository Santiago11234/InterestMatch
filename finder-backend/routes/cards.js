import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { userId, title, description, imgUrl } = req.body;

    const user = await User.findOne({ userId });
    user.interests.push({
      CardData: {
        title,
        description,
        imgUrl
      }
    });

    await user.save();

    res.status(201).json({ message: 'Card added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding card' });
  }
});

router.get('/get/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("User ID:", userId);
  try {
    const user = await User.findOne({ userId });
   
    res.status(200).send(user.interests);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

export default router;
