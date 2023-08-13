import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
