const User = require('../model/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.register = async (req, res) => {
  const { username, email, password, userLocation } = req.body;
  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      console.log('Username Already exists.');
      res.json({
        message: 'Username Already exists.',
        status: false,
      });
      return;
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      console.log('E-mail Already exists');
      res.json({
        message: 'E-mail Already exists',
        status: false,
      });
      return;
    }
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds = process.env.SALT_ROUNDS;
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const hashedPW = await bcrypt.hash(password + pepper, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPW,
      userLocation,
    });
    console.log(user.password);
    delete user.password;
    console.log(`User Created successfully \n ${user}`);
    return res.json({ status: true, user });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.login = async (req, res) => {
  const { username, password, userLocation } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Incorrect Username');
      res.json({
        message: 'Incorrect Username or Password.',
        status: false,
      });
      return;
    }
    const pepper = process.env.BCRYPT_PASSWORD;
    const validPassword = bcrypt.compareSync(password + pepper, user.password);
    if (!validPassword) {
      console.log('Incorrect Password');
      res.json({
        message: 'Incorrect Username or Password.',
        status: false,
      });
      return;
    }
    delete user.password;
    console.log(`Logged in \n ${user}`);
    console.log(`New Location: ${userLocation}`);
    await User.findOneAndUpdate(
      { username: username },
      { userLocation: userLocation }
    );
    return res.json({ status: true, user });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.setPic = async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePic = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isProfilePicSet: true,
      profilePic,
    });
    console.log(userData);
    return res.json({
      status: true,
      message: 'Profile picture has been updated successfully',
      image: userData.profilePic,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.showAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'profilePic',
      '_id',
    ]);
    return res.json({ users });
  } catch (error) {
    throw new Error(error);
  }
};
