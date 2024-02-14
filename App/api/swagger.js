const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AWS MSSQL Express API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // This line specifies that all .js files in the 'routes' folder are considered for Swagger documentation
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
