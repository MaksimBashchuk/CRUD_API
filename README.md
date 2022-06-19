# CRUD API

## INSTRUCTIONS:

- Make sure that you have **v16 LTS Node** installed on your computer
- Clone or download this repo https://github.com/MaksimBashchuk/CRUD_API
- Open your newly created folder with your code editor
- Checkout `crud-api` branch
- Type `npm i` to install all dependencies.
  > `.env` already exists in project and contains `PORT=3000` variable to start application

## How to use this app

> **NOTE:** App works with inmemory data base. App loaded with predefined array of users (4 user objects). Request body should be in **JSON** format.

### Starting app

- To start application in development mode run command `npm run start:dev`. It will runs application with nodemon and ts-node without compilation.
- To start application in production mode run command `npm run start:prod`. It will compile all `ts` files into `./dist/bundle.js` and run it with `NODE`.
- To run test use `npm run test`.

### Implementation details

- **GET** `api/users` is used to get all persons

  - Server answers with `status code` **200** and all users records.

- **GET** `api/users/${userId}`

  - Server answers with `status code` **200** and and record with `id === userId` if it exists
  - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

- **POST** `api/users` is used to create record about new user and store it in database

  - Server answers with `status code` **201** and newly created record
  - Server answers with `status code` **400** and corresponding message if body is not in **JSON** format
  - Server answers with `status code` **400** and corresponding message if request body does not contain required fields. To successfully create new user you should pass all required fields in proper format:
    - `username` - type `string`
    - `age` - type `number`
    - `hobbies` - type `string[]` (array of strings) or `[]` (empty array)
      Example:
    ```javascript
    // Original object
    { username: 'name', age: 30, hobbies: ['football'] }
    // Object in PUT body
    { hobbies: ['new hobby'] }
    // Object after update
    { username: 'name', age: 30, hobbies: ['football', 'new hobby'] }
    ```
  - Server answers with `status code` **400** and corresponding message if required fields have incorrect type
  - Server answers with `status code` **400** and corresponding message if request body contains `id` field

- **PUT** `api/users/{userId}` is used to update existing user

  - Server answers with `status code` **200** and updated record
  - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - Server answers with `status code` **400** and corresponding message if request body does not contain required fields. To successfully update user you should pass at least one of the required fields in proper format:
    - `username` - type `string`
    - `age` - type `number`
    - `hobbies` - type `string[]` (array of strings) or `[]` (empty array) - this field will be merged with `hobbies` field in target object

- **DELETE** `api/users/${userId}` is used to delete existing user from database

  - Server answers with `status code` **204** if the record is found and deleted
  - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

- Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)

- Errors on the server side that occur during the processing of a request handled and processed correctly (server answers with `status code` **500** and corresponding human-friendly message)
