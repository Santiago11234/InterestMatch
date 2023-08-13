import mongoose from 'mongoose';
import Card from './card.js';
import Conversation from './conversation.js';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profilePicture: { type: String, required: true },
    interests: [Card.schema], 
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    pairs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    conversations: [{type: Conversation.schema, ref: 'Conversation'}],
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const User = mongoose.model('User', userSchema);

export default User;
