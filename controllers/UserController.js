// import template for Users
var User = require('../models/User')
var Location = require('../models/Location')

exports.createUser = async function (req, res) {
  const user = new User({
    email: req.body.email,
    username: req.body.username
  })
  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    res.json({ message: error })
  }
}

// delete a user by username
exports.deleteUser = async function (req, res) {
  try {
    const username = req.params.username
    const deletedUser = await User.findOneAndDelete({ username })
    res.json({ deletedUser: deletedUser })
  } catch (error) {
    res.json({ message: error })
  }
}

// get a single user by username
exports.getUser = async function (req, res) {
  try {
    const username = req.body.username
    const user = await User.findOne({ username })
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.getAllUsers = async function (req, res) {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.updateUsername = async function (req, res) {
  try {
    const newUserName = req.body.username
    const updatedUser = await User.findOneAndUpdate({ username: req.params.username }, { $set: { username: newUserName } })
    res.json({ update: updatedUser, username: newUserName })
  } catch (error) {
    res.json({ message: error })
  }
}

// add new favorite by its name
exports.addFavorite = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.body.name })
    const updatedFavorite = await User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { _favorites: location._id } })
    res.json({ update: updatedFavorite, location: location })
  } catch (error) {
    res.json({ message: error })
  }
}

// add new seen location by its name
exports.addSeenLocation = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.body.name })
    const updatedFavorite = await User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { _locationsSeen: location._id } })
    res.json({ update: updatedFavorite, location: location })
  } catch (error) {
    res.json({ message: error })
  }
}

// delete a location in favorites by its name
exports.deleteFavorite = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.body.name })
    const user = await User.findOneAndUpdate({ username: req.params.username }, { $pull: { _favorites: location._id } })
    res.json({ user: user, location: location })
  } catch (error) {
    res.json({ message: error })
  }
}
