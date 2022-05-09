# Test Hamid for My Fund Action
## Simple Test

## Endpoints

- Login - http://localhost:3000/login
- Create employee data - http://localhost:3000/createEmployee
- Update employee data - http://localhost:3000/updateEmployee
- Delete employee data - http://localhost:3000/deleteEmployee/id
- Get all employee data - http://localhost:3000/getEmployees
- Get employee data by id - http://localhost:3000/getEmployee/id

I also attached postman collections in the root folder of this project to make the test much easier also note for authentication im using Authentication Header with value from environment variable to make the postman authentication easier

## Tech

This test is using some techs below :

- NodeJs - For the backend language
- ExpressJs - The backend framework
- PostgreSQL - The database
- Sequelize - The ORM for connecting Backend to Database
- Express Validator - To validate incoming request
- bcrypt - To encrypt and validate user's password
- jsonwebtoken - To do authentication whether a user is signed in or not

## Installation

Once you finished pulling this app make sure to install all the dependencies first by running below command from the command line in the root folder of this app


```sh
npm install
```

Also you need to create a postgre database with name "testHamid" without quotes and leave it blank, since all the tables and relations will be automatically created by the app when its started for the first time.
Don't forget to change the database connection options according to your PostgreSQL's settings eg: host, port, password, etc


## Running The App

Once everything is done you can launch the node server simple by execute this command

To run the app

```sh
npm start
```

It's using nodemon to make the development process much faster by autorestarting the node server if there's any code changes


## Note

This is just a simple application to do CRUD operations for employee data. You need to login before you can execute all the other endpoints, below is the default credential for logging in that created automatically when you start the application for the first time :

* Username : admin
* Password : admin

When you login successfully you'll get a jwt that will be needed as an authorization for accessing all the other endpoints. Please note that the authorization is needed by using the Authoraztion header with format as below

Authorization : Bearer {{jwt_token}}