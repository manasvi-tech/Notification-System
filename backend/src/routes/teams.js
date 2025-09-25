// src/routes/teams.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     tags:
 *       - Teams
 *     responses:
 *       200:
 *         description: Returns all teams
 */
router.get('/', teamController.list);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team
 *     tags:
 *       - Teams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created
 */
router.post('/', teamController.create);

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the requested team
 *       404:
 *         description: Team not found
 */
router.get('/:id', teamController.get);

/**
 * @swagger
 * /api/teams/{id}:
 *   put:
 *     summary: Update a team
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated
 *       404:
 *         description: Team not found
 */
router.put('/:id', teamController.update);

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team deleted
 *       404:
 *         description: Team not found
 */
router.delete('/:id', teamController.delete);

module.exports = router;
