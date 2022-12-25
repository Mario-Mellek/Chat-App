const User = require('../model/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      console.log('be Creative! \n Username Already exists.');
      res.json({
        message: 'be Creative! \n Username Already exists.',
        status: false,
      });
      return;
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      console.log('Hold on! I know you!! \n E-mail Already exists');
      res.json({
        message: 'Hold on! I know you!! \n E-mail Already exists',
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
    });
    delete user.password;
    console.log(`User Created successfully \n ${user}`);
    return res.json({ status: true, user });
  } catch (error) {
    throw new Error(error);
  }
};
