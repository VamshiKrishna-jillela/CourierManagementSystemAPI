
# Courier Management System API
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


 
 ## PROBLEM-STATEMENT/ STORY

 A person who wants to send a Courier, goes to the courier office and gives his/her courier in the office and pays the amount
 and  then return back to his work.
 An Employee who takes the courier , register the courier data  in the database and intiate the delivery process, that courier travells through many hubs, there the staff will update the status of the courier untill the courier reaches the destination.


## PROPOSED-SOLUTION
- Any one with valid courier id can track his/her courier status

-**FOR USER**
- sign-up,login and updating profile
- Getting Courier data as both sender and receiver
- Courier Tracking Facility
- Email Alerts during courier creation and after courier delivery

-**FOR EMPLOYEE**
- login factility 
- Has an access to create the Courier 
- Has an access to Update the courier status
- Has an access to fIlter the courier data based on various parameters


## Tech Stack


**Server:** Node, Express

**Database:** MYSQL


## Dependencies
 The following dependencies are used:
 -     "bcryptjs": "^2.4.3",
 -     "body-parser": "^1.20.1",
 -     "dotenv": "^16.0.3",
 -      "express": "^4.18.2",
 -     "http": "^0.0.1-security",
 -     "joi": "^17.7.0",
 -     "jsonwebtoken": "^8.5.1",
  -     "mysql": "^2.18.1"
## PROJECT OVERWIEW
 A light weight Application that offers the restfull web services for the above proposed features

-  CRUD operations for the Creating, Deleting, Updating, Getting User and Employee Profiles
-  Authentication
    - (bcrypt, jwt)
- user roles
    - updating Profile
    - getting his courier data 
    - as a sender
    - as a receiver

- employee role
  - updating Profile
   - adding  courier data into the database
    - updating the courier status
     - filtering the courier data based many parameters

    

## API Reference

#### Get Courier data by courier Id.

```http
  GET /api/courierSearch?courier_id=100000001
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courier_id` | `string` | **Required**. Your Courier ID |


#### User Registration

```http
  POST /api/user/signUp
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_name`      | `string` | **Required**. must be english alphabets with at least 3 characters and at most 255 characters |
| `user_email`      | `string` | **Required**. must be an  valid email|
| `user_password`      | `string` | **Required**. at least 8 characters and atmost 25 characters with atleast one letter, one number and one special character |
| `user_retype_password`      | `string` | should be same as `user_password`|
| `user_phone_number`      | `string` | **Required**. must be an  10 digit string|
| `user_address`      | `string` | **Required**. must be english alphabets with at least 6 characters and at most 255 charactersg|
| `user_city`      | `string` | **Required**. must be english alphabets with at least 6 characters and at most 255 characters|
| `user_state`      | `string` | **Required**. must be english alphabets with at least 6 characters and at most 255 characters|
| `user_pincode`      | `string` | **Required**. must be 6 digit string|

#### returns

It return a json object in body which contains

#### on-successful Registration with status code 200

`{
    "message": "signup successful",
    "id": {7 -digit User-ID alloted to that user} for example:9133197
}`

#### any faliure might
-  bad user request
-  internal server issue

#### User login

```http
  POST /api/user/login
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_phone_number`      | `string` | **Required**. must be 10 digit string|
| `user_password`      | `string` | **Required**. at least 8 characters and atmost 25 characters with atleast one letter, one number and one special character |
| `user_retype_password`      | `string` | should be same as `user_password`|

#### returns

It return a json object in the response body which contains

#### on-successful Registration with status code 200

`{
    "message": "login successful"
}`

- response header contains the following jwt token. 
`auth-token →bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDA5NywiaWF0IjoxNjY4MDAwNzE2LCJleHAiOjE2NjgwMTA3MTZ9.TRA0jA6wZukWnHjE-kZstos89aO1OsZ5iMdQDFlsLoQ
`
-  for any private routes, this token is must be valid and compulsory.

#### any faliure might
-  Internal server issue
- invalid Credentials 
- bad user request



## License

[MIT](https://choosealicense.com/licenses/mit/)

