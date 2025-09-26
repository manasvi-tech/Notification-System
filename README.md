# Alerting & Notification Platform

A full-stack backend for delivering, scheduling, and tracking in-app alerts and notifications with role-based access and analytics.

## Features

- **User, Team, and Alert Management:** Register users, create teams, and issue alerts with fine-grained visibility (org/team/user).
- **Role-based Access Control:** Admins can manage alerts; users receive and interact with notifications.
- **Notification Delivery Scheduler:** Automated reminder delivery using configurable intervals.
- **User Preferences:** Mark alerts as read, snooze alerts, track history.
- **Analytics Dashboard:** Aggregated stats on alerts delivered, read, snoozed, and severity breakdown.
- **Full REST API Documentation with Swagger UI.**

## Technology

- Node.js + Express
- Sequelize ORM (PostgreSQL/MySQL)
- JWT Authentication
- `node-cron` for scheduling
- Swagger UI for API docs

## Quick Start

1. **Clone & Install**

```
git clone https://github.com/manasvi-tech/Notification-System.git
cd Notification-System/backend
npm install
```

2. **Configure Environment**  
Create a `.env` with DB and JWT secret:

```
DATABASE_URL=your-database-url
SECRET=your_jwt_secret_here
```


3. **Run Migrations & Seed Data**  
*(Describe migrate/seed commands if you have them, or manually create sample users/teams from the docs for testing)*

4. **Start Server**
```
npm start
```

Default: `http://localhost:3000`

5. **API Documentation**  
- Visit: [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
- All routes and schemas are fully described in Swagger UI.

## API Overview

**User Routes:**  
- Register, login, profile, update, list users  
- `/api/users/my-alerts`: Get all active alerts for current user

**Team Routes:**  
- CRUD teams

**Alert Routes:**  
- Admin-only: Create, update, list, fetch, delete alerts
- `/api/alerts/analytics`: Get aggregated stats

**User Alert Preference:**  
- Mark as read/unread, snooze, get all preferences

**Notification Delivery:**  
- Internal delivery set via scheduler; check `/api/notifications` endpoints for delivery records

## Roles

- **Admin:** Create/update/delete alerts, view analytics, assign visibility
- **User:** Receive, snooze, read alerts, view personal alerts

## Scheduler

- Uses `node-cron` to automatically deliver reminders for active alerts according to their configuration.  
- Scheduler starts automatically with the server.

## Testing

- Test with Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Recommended: 
- Login as admin; create alerts with various visibilities
- Login as users; check `/my-alerts`
- Check `/alerts/analytics` for dashboard stats
- Interact with delivery and alert preference APIs

## Environment

- Node 18+
- PostgreSQL/MySQL recommended for production

## License

MIT (or your preferred license)


