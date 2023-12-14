const alltasks = {
    get : {
        tags:['task'],
        description:"list of all tasks",
        security  : [
            {
                BearerAuth: [],
              },
        ],
        responses:{
            200 : {
                description:"ok",
                content:{
                    "appication/json":{
                      schema:{
                        type:"object",
                        example:{
                        
                            desc: "home work",
                            completed: true,
                            owner: "6476e9bf27d1b7b864dda166",
                            _id: "6476eb365f91ede32b2f05cf",
                            __v: 0
                       
                             }
                    }
                    }
                }
            },         
             '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                  type: 'object',
                  example:{
                  error : 'Unauthorized'
                  }
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example:{
                    error : 'error message'
                    }
                    },
                },
              },
            },
            
        }
    },
}
const Ctasks = {
    get : {
        tags:['task'],
        description:"list of incompleted tasks",
        security  : [
            {
                BearerAuth: [],
              },
        ],
        responses:{
            200 : {
                description:"ok",
                content:{
                    "appication/json":{
                      schema:{
                        type:"array",
                        example:{
                          
                            desc: "home work",
                            completed: true,
                            owner: "6476e9bf27d1b7b864dda166",
                            _id: "6476eb365f91ede32b2f05cf",
                            __v: 0
                       
                             }
                    }
                    }
                }
            },          
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                  type: 'object',
                  example:{
                  error : 'Unauthorized'
                  }
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example:{
                    error : 'error message'
                    }
                    },
                },
              },
            },
            
        }
    },
}
const deleteTask = {
    
        delete: {
          tags: ["task"],
          summary: "Delete a task",
          security: [
            {
              BearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID of the task to delete",
            },
          ],
          responses: {
            "200": {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema:{
                    type:"object",
                    example:{
                    
                        desc: "home work",
                        completed: true,
                        owner: "6476e9bf27d1b7b864dda166",
                        _id: "6476eb365f91ede32b2f05cf",
                        __v: 0
                   
                         }
                },
                },
              },
            },
            "404": {
              description: "Task not found",
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                  type: 'object',
                  example:{
                  error : 'Unauthorized'
                  }
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example:{
                    error : 'error message'
                    }
                    },
                },
              },
            },
          },
        },
        patch: {
            tags: ["task"],
            summary: "Update a task",
            parameters: [
              {
                in: "path",
                name: "id",
                required: true,
                schema: {
                  type: "string",
                },
                description: "ID of the task to update",
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema:{
                    type:"object",
                    example:{
                    
                        desc: "home work",
                        completed: true,
                      
                   
                         }
                },
                },
              },
            },
            security: [
              {
                BearerAuth: [],
              },
            ],
            responses: {
              "200": {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema:{
                      type:"object",
                      example:{
                      
                          desc: "home work",
                          completed: true,
                          owner: "6476e9bf27d1b7b864dda166",
                          _id: "6476eb365f91ede32b2f05cf",
                          __v: 0
                     
                           }
                  },
                  },
                },
              },
              "404": {
                description: "Task not found",
              },
              '401': {
                description: 'Unauthorized',
                content: {
                  'application/json': {
                    schema: {
                    type: 'object',
                    example:{
                    error : 'Unauthorized'
                    }
                    },
                  },
                },
              },
              '500': {
                description: 'Internal server error',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      example:{
                      error : 'error message'
                      }
                      },
                  },
                },
              },
            },
          },
        get: {
            tags: ["task"],
            summary: "Get a task by id",
            security: [
                {
                  BearerAuth: [],
                },
              ],
            parameters: [
              {
                in: "path",
                name: "id",
                required: true,
                schema: {
                  type: "string",
                },
                description: "ID of the task to retrieve",
              },
            ],
       
            responses: {
              "200": {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema:{
                      type:"object",
                      example:{
                      
                          desc: "home work",
                          completed: true,
                          owner: "6476e9bf27d1b7b864dda166",
                          _id: "6476eb365f91ede32b2f05cf",
                          __v: 0
                     
                           }
                  },
                  },
                },
              },
              "404": {
                description: "Task not found",
              },
              '401': {
                description: 'Unauthorized',
                content: {
                  'application/json': {
                    schema: {
                    type: 'object',
                    example:{
                    error : 'Unauthorized'
                    }
                    },
                  },
                },
              },
              '500': {
                description: 'Internal server error',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      example:{
                      error : 'error message'
                      }
                      },
                  },
                },
              },
            },
          },
        }
const createTask = {
    post:{
        tags:['task'],
        description:"Create a task", 
         security: [
            {
              BearerAuth: [],
            },
          ], 
        requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['desc', 'completed'],
                  properties: {
                    desc: {
                      type: 'string',
                      description: 'task description',
                      example: 'home work',
                    },
                    completed: {
                      type: 'boolean',
                      description: 'True/false',
                    },
                  },
                },
              },
            }}, 
    responses:{
        201 : {
            description:"ok",
            content:{
                "appication/json":{
                    schema:{
                        type:"object",
                        example:{
                        
                            desc: "home work",
                            completed: true,
                            owner: "6476e9bf27d1b7b864dda166",
                            _id: "6476eb365f91ede32b2f05cf",
                            __v: 0
                       
                             }
                    }
                }
            }
        }, '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
              type: 'object',
              example:{
              error : 'Unauthorized'
              }
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example:{
                error : 'error message'
                }
                },
            },
          },
        },
         
        
    }
}
}

const task = {"/tasks" : alltasks,
              "/task/notCompleted" : Ctasks,
              "/task" : createTask ,
              "/task/{id}": deleteTask,
              
              
            //   "/task/:id" : useridres , 
            //   "/task" : profie ,  
}

module.exports = task