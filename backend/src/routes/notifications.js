const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticate = require('../utils/authenticate'); // if required

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a notification delivery
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alert_id
 *               - user_id
 *               - sent_timestamp
 *             properties:
 *               alert_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               sent_timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: NotificationDelivery created
 */
router.post('/', authenticate, notificationController.create);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: List all notification deliveries
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of NotificationDeliveries
 */
router.get('/', authenticate, notificationController.list);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get NotificationDelivery by ID
 *     tags: [Notifications]
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
 *         description: NotificationDelivery data
 *       404:
 *         description: NotificationDelivery not found
 */
router.get('/:id', authenticate, notificationController.get);

module.exports = router;
