const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authenticate = require('../utils/authenticate'); // protect as needed

/**
 * @swagger
 * /api/alerts:
 *   post:
 *     summary: Create a new alert
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *               - severity
 *               - delivery_type
 *               - reminder_frequency
 *               - start_time
 *               - expiry_time
 *               - status
 *               - visibility_type
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [info, warning, critical]
 *               delivery_type:
 *                 type: string
 *               reminder_frequency:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               expiry_time:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, archived, expired]
 *               visibility_type:
 *                 type: string
 *                 enum: [org, team, user]
 *               visibility_team_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               visibility_user_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Alert created
 */
router.post('/', authenticate, alertController.create);

/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: List all alerts
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of alerts
 */
router.get('/', authenticate, alertController.list);

/**
 * @swagger
 * /api/alerts/{id}:
 *   get:
 *     summary: Get an alert by ID
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alert data
 *       404:
 *         description: Alert not found
 */
router.get('/:id', authenticate, alertController.get);

/**
 * @swagger
 * /api/alerts/{id}:
 *   put:
 *     summary: Update an alert
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [info, warning, critical]
 *               delivery_type:
 *                 type: string
 *               reminder_frequency:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               expiry_time:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, archived, expired]
 *               visibility_type:
 *                 type: string
 *                 enum: [org, team, user]
 *               visibility_team_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               visibility_user_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Updated alert
 *       404:
 *         description: Alert not found
 */
router.put('/:id', authenticate, alertController.update);

/**
 * @swagger
 * /api/alerts/{id}:
 *   delete:
 *     summary: Delete an alert
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Alert not found
 */
router.delete('/:id', authenticate, alertController.delete);


module.exports = router;
