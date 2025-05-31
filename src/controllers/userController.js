const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.user
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ status: false, message: 'No user found' });
    }
    res.status(200).json({ status: true, message: 'user found', user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { first_name, last_name, email } = req.body;
    // Validate input
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    const updateUser = await User.findByIdAndUpdate(userId, {
      first_name,
      last_name,
      email
    }, { new: true });
    res.status(200).json({ status: true, message: 'User updated successfully', user: updateUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: 'No user found' }); 
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ status: true, message: 'User successfully deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (users.length === 0) {
      return res.status(404).json({ status: false, message: 'No users found' });
    }
    res.status(200).json({ status: true, message: 'Users retrieved successfully', users });
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  } 
}

exports.updateUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { first_name, last_name, email, isAdmin } = req.body;
    // Validate input
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    const updateUser = await User.findByIdAndUpdate(userId, {
      first_name,
      last_name,
      email,
      isAdmin
    }, { new: true });
    res.status(200).json({ status: true, message: 'User updated successfully', user: updateUser });
  } catch (error) {
    console.error('Error updating user by admin:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
}

exports.deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: 'No user found' });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ status: true, message: 'User successfully deleted' });
  } catch (error) {
    console.error('Error deleting user by admin:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
}