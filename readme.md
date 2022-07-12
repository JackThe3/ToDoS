# ToDo

### Introduction
User can create ToDo list and can add task to this list. This ToDo list can be shared with other Users.
Task is modifiable by User that created this ToDo list or by shared User.  

### Requirements 
1. Postgresql database

   https://www.postgresql.org/docs/current/tutorial-install.html


2. Sequelize

   https://github.com/sequelize/cli


3. Node.js

   https://nodejs.org/en/docs/


### Installation

1. Install NPM packages
   ```sh
   npm install
   ```

2. Setup `.env` file:
   ```env
   API_PORT=3030
   DB_PORT=5432
   DB_URL=notingit
   NODE_ENV=development
   SECRET=notingit
   ```
   
3. Run database migrations with:

   ```env
   sequelize db:migrate
   ```


5. Run project in dev mode
    ```sh
    nodemon src/server.ts
    ```

# REST API

### Authorization
For some requests authorization is required.
Request token is expected in `x-access-token` header.

## Add User to database

### Request

`POST /users/register`

Request body:
```JSON
{
   "email": "UserEmail@email.com",
   "password": "USerPassword123"
}
```

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    body: { message: 'REGISTER was successful'}

### Response

    HTTP/1.1 400 Bad Request
    Status: 400 Bad Request
    Content-Type: application/json

    body: { message: 'REGISTER was not successful', error: Validation error}

## Authenticate User

### Request

`POST /users/authentication`

Request body:
```JSON
{
   "email": "UserEmail@email.com",
   "password": "USerPassword123"
}
```

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    body: { "token": "example token 4564asdasd",
    "user": {
        "email": "UserEmail@email.com"
    }}

### Response

    HTTP/1.1 401 Unauthorized
    Status: 401 Unauthorized
    Content-Type: application/json

    body: { message: 'Invalid Credentials'}

## Get list of ToDos

### Request

`GET /todos/`

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

     "result": [{
         {
            "id": 1,
            "name": "Todo",
            "Tasks": [
               {
                    "id": 1,
                    "title": "task_title",
                    "description": "tasl_description",
                    "deadline": "2022-07-12T17:23:01Z",
                    "status": "in progress",
                    "UserId": 3,
                    "TodoId": 1
                }
            ],
            "Users": [
                {
                    "id": 3,
                    "email": "User@email.com",
                }
            ]
         }
         }]

## Add ToDo to database

### Request

`POST /todos/create`

`authorization required`

Request body:
```JSON
{
   "name": "Todo_name"
}
```

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    body: { message: 'new Todo was created'}


### Response

    HTTP/1.1 400 Bad Request
    Status: 400 Bad Request
    Content-Type: application/json

    body: { message: 'Todo not added', error: Validation error}

## Share ToDo with User

### Request

`POST /todos/share`

`authorization required`

Request body:
```JSON
{
   "name": "Task_name",
   "email": "User@toShareWith.com"
}
```

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    body: { message: 'Todo was shared'}


### Response

    HTTP/1.1 400 Bad Request
    Status: 400 Bad Request
    Content-Type: application/json

    body: { message: 'user doesnt exist'}

## Add Task to ToDo

### Request

`POST /task/create`

`authorization required`

Request body:
```JSON
{
   "name": "name_of_todolist_that_will_have_this_task",
   "title": "Task_title",
   "status": "status, default = in progress",
   "description": "description is not required, but can be useful",
   "deadline": "2022-07-12T17:23:01Z"
}

```

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    body: { message: 'task added'}


### Response

    HTTP/1.1 400 Bad Request
    Status: 400 Bad Request
    Content-Type: application/json

    body: { message: 'cant add this task, todo does not exist'}

## Update values in Task

### Request

`PUT /task/update`

`authorization required`

Request body:
```JSON
{
   "name": "ToDo_name_that_have_this_task",
   "title": "Task_title_that_will_be_updated",
   "status": "DONE",
   "description": "Task in ToDo_name was DONE"
}

```

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    body: { message: 'task modified'}


### Response

    HTTP/1.1 400 Bad Request
    Status: 400 Bad Request
    Content-Type: application/json

    body: { message: 'wrong request body'}