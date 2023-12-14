const userres = {
    get : {
        tags:['user'],
        description:"list of all users",
        responses:{
            201 : {
                description:"ok",
                content:{
                    "appication/json":{
                        schema:{
                            type:"object",
                            example:{
                                name:"abell",
                                email:"email@g.com",
                                age:"12"
                            }
                        }
                    }
                }
            },
            '500':{description: "Internal Server Error"}        
        }
    },
    post:{
        tags:['user'],
        description:"Create a user users",  
        requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: {
                      type: 'string',
                      description: 'Name of the user',
                      example: 'test',
                    },
                    age: {
                      type: 'number',
                      description: 'Age of the user',
                      example: 12,
                    },
                    email: {
                      type: 'string',
                      description: 'Email of the user',
                      example: 'test200@gmail.com',
                    },
                    password: {
                      type: 'string',
                      description: 'Password of the user',
                      example: 'test12345',
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
                          user: {
                            name: "test",
                            email: "test200@gmail.com",
                            age: 12,
                            _id: "6476d42ec276038e1fc9b780",
                            __v: 1
                          },
                          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc2ZDQyZWMyNzYwMzhlMWZjOWI3ODAiLCJpYXQiOjE2ODU1MDkxNjd9.BWpWpOscUDfyvjQ69R4BDwij0xX6nEh3Tbu9vZ4LvGU"
                        }
                    }
                }
            }
        },
        '500':{description: "Internal Server Error"}
        
    }
}
}

const useridres={
    get : {
        tags:['user'],
        description:"get users by id ",
        summary:"get users by id ",
        parameters:[
            {
          name: "id" ,
          in: "params" ,
          description: "id of the user" , 
          required: true,
          type : "objectID",
          example: "646a126c838677cecb451b31"
            }
        ],
        responses:{
            200 : {
                description:"ok",
                content:{
                    "appication/json":{
                        schema:{
                            type:"object",
                            example:{
                                name:"abell",
                                email:"email@g.com",
                                age:"12"
                            }
                        }
                    }
                }
            },
            '400':{
            description: "Invalid ID supplied"},
            '404':{  description: "user not found"},
          
            '405':{description: "Validation exception"}
            
        }
    },
}
const userlogin = {
    post: {
        tags: ['user'],
        summary: 'User login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    description: 'User email',
                    example: 'test200@gmail.com',
                  },
                  password: {
                    type: 'string',
                    description: 'User password',
                    example: 'test12345',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      type: 'object',
                      description: 'User object',
                      example : {
                        _id : "646f1b83ef5c1f61bef40ed4",
                        name: "test2",
                        email: "test2@gmail.com",
                        age: 12,
                        __v: 5
                      }
                    },
                    token: {
                      type: 'string',
                      description: 'Bearer token',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Error message',
                      example: 'invalid email or password',
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
const profie = {
    get: {
        tags: ['user'],
        summary: 'Get current user',
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            content:{
              'application/json':{
                schema: {
                      type: 'object',
                      description: 'User object',
                      example : {
                        _id : "646f1b83ef5c1f61bef40ed4",
                        name: "test2",
                        email: "test2@gmail.com",
                        age: 12,
                        __v: 5
                      }}
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
                type: 'object',
                example:{
                error : 'the error message'
                }
              },
            },
          },
        },
      }, 

}

const logout = {
    post: {
        tags: ['user'],
        summary: 'logout ',
        security: [
            {
              BearerAuth: [],
            },
          ],
        responses: {
          '200': {
            description: 'Successful operation',
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
                type: 'object',
                example:{
                error : 'the error message'
                }
              },
            },
          },
        },
      }, 

}
const logoutAll = {
    post: {
        tags: ['user'],
        summary: 'logout',
        security: [
            {
              BearerAuth: [],
            },
          ],
        responses: {
          '200': {
            description: 'Successful operation',
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
                type: 'object',
                example:{
                error : 'the error message'
                }
              },
            },
          },
        },
      }, 

}
const updateUser={
    patch: {
        tags: ['user'],
        summary: 'Update user',
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
                properties: {
                  name: {
                    type: 'string',
                    description: 'User name',
                    example: 'John Doe',
                  },
                  age: {
                    type: 'number',
                    description: 'User age',
                    example: 30,
                  },
                  email: {
                    type: 'string',
                    description: 'User email',
                    example: 'john@example.com',
                  },
                  password: {
                    type: 'string',
                    description: 'User password',
                    example: 'password123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful update',
            content: {
              'application/json': {
                schema: {
                },
              },
            },
          },
          '400': {
            description: 'invaid action',
            content: {
              'application/json': {
                schema: {
                type: 'object',
                example:{
                error : 'invaid action'
                }
                },
              },
            },
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
          '404': {
            description: 'not found',
            content: {
              'application/json': {
                schema: {
                type: 'object',
                example:{
                error : 'not found'
                }
                },
              },
            },
          },

          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                type: 'object',
                example:{
                error : 'the error message'
                }
              },
            },
          },
    
       
      
        },
     
}
}
const deleteUser = {
    delete: {
        tags: ['user'],
        summary: 'Delete user',
        security: [
            {
              BearerAuth: [],
            },
          ],
        responses: {
          '204': {
            description: 'Successful deletion',
            content: {
              'application/json': {
                schema: {
                type: 'object',
                example:{
                  _id: "646f1b83ef5c1f61bef40ed4",
                  name: "test2",
                  email: "test2@gmail.com",
                  age: 12,
                  __v: 5
                }
                },
              },
            },

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







const user = {"/users" : userres ,
              "/user/:id" : useridres , 
              "/user/login" : userlogin , 
              "/users/me" : profie ,  
              "/user/logout" : logout , 
              "/user/logoutFromAll" : logoutAll,
              "/user/update" : updateUser,
              "/user/delete" : deleteUser,
}

module.exports = user


 
    
 
 





  
   
    




