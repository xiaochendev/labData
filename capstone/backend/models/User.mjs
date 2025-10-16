import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: function () { return !this.isGuest; }, // guests don't need email
    unique: true,
    sparse: true, // allows multiple guests without email
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: function () { return !this.isGuest; },
  },
  isGuest: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔒 Hash password before save (only for registered users) by using pre('save') hook
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();

  if (!this.isGuest && this.passwordHash) {
    console.log("🔐 Hashing password in pre-save hook");

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  }
  next();
});

export default mongoose.model('User', userSchema);
