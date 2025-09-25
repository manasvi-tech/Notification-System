// src/controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'your_secret'; // move to env vars

exports.register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hash });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    console.error(e); // Log full error in your terminal for debugging
    if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: e.errors.map(err => err.message) });
    }
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(401).json({ error: 'No user found' });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
};

exports.profile = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, team_id: user.team_id });
};

exports.update = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  await user.update(req.body);
  res.json({ message: 'Updated', user });
};

exports.list = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'team_id'] });
  res.json(users);
};
