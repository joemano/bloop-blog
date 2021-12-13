const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Check if the user already exists. When sending an error do not reveal whether the password or email is incorrect.
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: 'Email or password invalid.' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: 'Email or password invalid.'});

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: '1h'});

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went horribly wrong.' });
  }
}

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(existingUser) return res.status(404).json({ message: 'Email already in use.' });

    if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords must match.'});

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: '1h'});

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went horribly wrong.' });
  }
}
