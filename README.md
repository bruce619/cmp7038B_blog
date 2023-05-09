# cmp7038B_blog (Secure Web Blog)
CMP7038B Blog is a simple secured web blog that contains mitigations against web security vulnerabilities like
Account Enumeration, SQL Injection, Session Hijacking, Cross Site Scripting (XSS), & Cross Site Request Forgery.

## Features
- User Registration and Login
- Profile creation and uploading of profile picture
- CRUD (Create, Read, Update, Delete) blog posts

## Architecture  & Design Pattern
[MVC (Model-View-Controller)](https://www.geeksforgeeks.org/model-view-controllermvc-architecture-for-node-applications/)

## Requirements
Use the latest version of Node/NPM

## Tech
- [Node JS](https://www.nodejs.org)
- [Express JS](https://www.expressjs.com)
- [EJS](https://ejs.co/)
- [Postgres](https://www.postgresql.org/)
- [Knex JS](https://knexjs.org/)
- [Objection JS](https://vincit.github.io/objection.js/)

## Installation
Use the package manager [npm](https://docs.npmjs.com/cli/v9/commands/npm-install) to install all dependencies in package.json

``` bash
npm install
```

Create a .env file in the project root directory. 
In the .env file create environment variables for development and production environments like:

> development environment
- SECRET_KEY=your-alphanumeric-secret-key

> app
- NODE_ENV=development
- DEV_APP_PORT=3000

> dev database
- DEV_DB_HOST=localhost
- DEV_DB_PORT=5432
- DEV_DB_USER=your local db user name
- DEV_DB_DATABASE=blog
- DEV_DB_PASSWORD=your local pg db password

> email server credentials
- EMAIL_USERNAME=
- EMAIL_PASSWORD=
- OAUTH_CLIENT_ID=
- OAUTH_CLIENT_SECRET=
- OAUTH_REFRESH_TOKEN=


> prod database
- PROD_DB_USER=
- PROD_DB_DATABASE=
- PROD_DB_PASSWORD=
- PROD_DB_HOST=cmpstudb-01.cmp.uea.ac.uk
- PROD_DB_PORT=5432

Migrate the database schema to your pg database (blog)
```bash
npm run migrate
```
Load db with seed data
```bash
npm run seed
```
To run the Node app use
```bash
npm start
```



