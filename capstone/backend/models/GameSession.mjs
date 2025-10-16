import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeToComplete: {
    type: Number, // in seconds or ms depending on your game
    required: true,
  },
  playedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('GameSession', gameSessionSchema);
