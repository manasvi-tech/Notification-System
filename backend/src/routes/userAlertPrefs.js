const express = require('express');
const router = express.Router();
const controller = require('../controllers/userAlertPreferenceController');
const authenticate = require('../utils/authenticate'); // required!

/**
 * @swagger
 * /api/user-alert-preferences:
 *   post:
 *     summary: Set read/snooze state for a user-alert
 *     tags: [UserAlertPreference]
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
 *             properties:
 *               alert_id: { type: integer }
 *               user_id:  { type: integer }
 *               is_read:  { type: boolean }
 *               snoozed_until: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Set/created preference object
 */
router.post('/', authenticate, controller.setPreference);

/**
 * @swagger
 * /api/user-alert-preferences/read:
 *   post:
 *     summary: Mark an alert as read for current user
 *     tags: [UserAlertPreference]
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
 *             properties:
 *               alert_id: { type: integer }
 *     responses:
 *       200:
 *         description: Marked as read
 */
router.post('/read', authenticate, controller.markRead);

/**
 * @swagger
 * /api/user-alert-preferences/snooze:
 *   post:
 *     summary: Snooze an alert for current user
 *     tags: [UserAlertPreference]
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
 *               - snoozed_until
 *             properties:
 *               alert_id: { type: integer }
 *               snoozed_until: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Snoozed
 */
router.post('/snooze', authenticate, controller.snooze);

/**
 * @swagger
 * /api/user-alert-preferences:
 *   get:
 *     summary: List the current user's alert preferences
 *     tags: [UserAlertPreference]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of preferences
 */
router.get('/', authenticate, controller.listMyPrefs);

module.exports = router;
