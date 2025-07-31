const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eBanking API',
      version: '1.0.0',
      description: 'API documentation for eBanking backend',
    },
    servers: [
      {
        url: 'http://localhost:4022/api',
      },
      {
        url: 'http://192.168.100.4:4022/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files for Swagger comments
};

const specs = swaggerJsdoc(options);

module.exports = specs;