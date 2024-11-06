import User from './user.js';

const getUserById = (id) => {
  return User.findById(id).exec(); //exec() in queries - no more querying coming out of this (return a real promise)
}

const getAllUsers = () => {
  return User.find({}).exec();
}

const createUser = (userDetails) => {
  return User.create(userDetails);
}
const removeUserById = (id) => {
  return User.findByIdAndDelete(id).exec();
}

const updateUserById = async (id, update) => {
  return User.findByIdAndUpdate(id, update, { new: true }).exec(); //{ new: true } - by default, it returns user before it's updated
}

export default {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}