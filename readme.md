# Test Hamid for My Fund Action

## Endpoints

- Login - http://localhost:3000/login
- Create employee data - http://localhost:3000/createEmployee
- Update employee data - http://localhost:3000/updateEmployee
- Delete employee data - http://localhost:3000/deleteEmployee/id
- Get all employee data - http://localhost:3000/getEmployees
- Get employee data by id - http://localhost:3000/getEmployee/id

I also attached postman collections in the root folder of this project to make the test much easier, also note that for authentication im using Authentication Header with value from environment variable to make the postman authentication easier with format as below :
Authorization : Bearer {{jwt_token}}

## Tech

This app is using techs below :

- NodeJs - The backend language
- ExpressJs - The backend framework
- PostgreSQL - The database
- Sequelize - The ORM for connecting the Backend to Database
- Express Validator - To do validation for incoming request
- bcrypt - To encrypt and validate user's password
- jsonwebtoken - To do authorization check, whether a user has a valid token or not

## Installation

Once you finished pulling this app make sure to install all the dependencies first by running below command from the command line in the root folder of this app


```sh
npm install
```

Also you need to create a postgre database with name "testHamid" without quotes and leave it blank, since all the tables and relations will be automatically created by the app when it starts for the first time.
Don't forget to change the database connection options according to your PostgreSQL's settings eg: host, port, password, etc


## Running The App

Once everything is done you can launch the node server simple by executing this command :

To run the app

```sh
npm start
```

It's using nodemon to make the development process much faster by autorestarting the node server if there's any code changes


## Note

This is just a simple application to do CRUD operations for employee data. You need to login before you can access all the other endpoints, below is the default credential for logging in to the app, that created automatically when you run the node server for the first time :

* Username : admin
* Password : admin

When you logged in successfully you'll get a jwt that will be needed for the authorization to access all the endpoints except the login endpoint

