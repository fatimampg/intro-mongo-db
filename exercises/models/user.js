import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  betaUser: {
    type: Boolean,
    default: false
  },
  birthDate: Date,
  pets: [{type: String}],
  address: {
    other: Boolean,
    street: String,
    houseNumber: Number,
    zip: Number,
    city: String,
    State: String
  }
})

export default mongoose.model('user', userSchema);