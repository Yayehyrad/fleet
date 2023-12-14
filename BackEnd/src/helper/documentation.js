const { json } = require("express");
const User = require('../routers/user.docs')
const Task = require('../routers/task.docs')
const swaggerDoccs = {
    
    openapi: "3.0.0",
    info : {
        title : "Demo",
        version:"0.0.1",
        description : "This is a sample task management Server based on the OpenAPI 3.0 specification."

    },
    servers:[
        {
            url: "http://localhost:3000",
            description:"Local dev"
        },
        {
            url: "http://prductino:3000",
            description:"Production"
        },
    ],
    tags:[{
        name : "user",
        description : "user routes"
    },
    {
        name : "task",
        description : "tsak routes"
    }
    ],
    paths:  {...User , ...Task},
    components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Bearer Token',
            name: 'Authorization',
            in: 'header',
            value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZmMWI4M2VmNWMxZjYxYmVmNDBlZDQiLCJpYXQiOjE2ODUwOTI2NjF9.7R3PUNzjjHvIHuEDFbWy2sOZbm7SUOZ3dPrRl-je0Pw'
          },
        },
      },

    
}

module.exports = swaggerDoccs;