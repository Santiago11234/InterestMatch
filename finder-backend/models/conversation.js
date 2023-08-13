import mongoose from 'mongoose';
import User from './user.js';

const conversationSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true
  },
  pair: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
},
{ timestamps: true, toJSON: { virtuals: true }}
);

  
  const Conversation = mongoose.model('Conversation', conversationSchema);
  

  export default Conversation;