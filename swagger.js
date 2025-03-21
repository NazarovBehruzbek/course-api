const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course API",
      version: "1.0.0",
      description: "Node.js Express va MongoDB yordamida API",
    },
    servers: [
      {
        url: "http://localhost:3000", // API’ning asosiy URL'ini kiriting
      },
    ],
  },
  apis: ["./routes/*.js"], // 📌 API hujjatlari uchun marshrutlar (routes) fayllari
};
const swaggerDocs = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerDocs };
