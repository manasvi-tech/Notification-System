// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const usersRouter = require('./src/routes/users');
const teamsRouter = require('./src/routes/teams');
const alertsRouter = require('./src/routes/alerts');

const app = express();
app.use(express.json());
// Swagger setup

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/**/*.js'] // Or the location of your annotated route files
};

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/alerts', alertsRouter);

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.listen(3000, () => console.log('Server listening on port 3000'));
