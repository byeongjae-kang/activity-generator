# Activity Generator

A backend server that uses [boredapi.com](http://boredapi.com) api to generate random activities.

## GET /activity

- generate random activity
- example response

```JSON
      {
        "activity": "Shred old documents you don't need anymore",
        "type": "busywork",
        "participants": 1,
        "price": 0,
        "link": "",
        "key": "2430066",
        "accessibility": 0
      }
```

## POST /user

- create user and save it to the MongoDB and store user information to session
- takes “name”, “accessibility” (High, Medium, or Low), and “price” (Free, Low, or
  High) in JSON format
- price and accessibility are optional

```JSON
      {
        "name": "John",
        "accessibility": "High",
        "price": "Free"
      }
```

- Once a user profile has been created, the /activity endpoint should now only return activities
  that fit the user’s requirements. For example, the /activity endpoint should return an activity
  with accessibility “High” and price “Low” if the current user’s profile has accessibility “High” and
  price “Low”.

# SETUP

### Environment

Please copy `.env.development.example` file, create `.env.development` file, and add values as needed. if no values are added default values will be applied as below

```dotenv
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017
        MONGODB_NAME=activity
        SESSION_KEY1=key1
        SESSION_KEY2=key2
```

### Database

If you are new to MongoDB, please download MongDB Compass and follow the instruction [here]("https://www.mongodb.com/docs/compass/current/")

### Install Dependencies

```zsh
  npm install
```

### Run Server

```zsh
  npm start
```

HAVE FUN!!
