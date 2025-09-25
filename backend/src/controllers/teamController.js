// src/controllers/teamController.js
const { Team } = require('../models'); // adjust path if using index.js export

// Get all teams
exports.list = async (req, res) => {
  const teams = await Team.findAll();
  res.json(teams);
};

// Create a team
exports.create = async (req, res) => {
  try {
    const team = await Team.create({ name: req.body.name });
    res.status(201).json(team);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get a team by ID
exports.get = async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
};

// Update a team
exports.update = async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team not found' });
  await team.update({ name: req.body.name });
  res.json(team);
};

// Delete a team
exports.delete = async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team not found' });
  await team.destroy();
  res.json({ message: 'Deleted' });
};
