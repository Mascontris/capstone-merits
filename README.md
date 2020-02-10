# Merits (Server)

This is the backend code for Merits, an App that lets parents keep track of their childrens deeds and actions.

- [Link to Live App](https://capstone-merits-client.now.sh/)
- [Link to Client Repo](https://github.com/Mascontris/capstone-merits-client)

## API Documentation

### Households Endpoints

### ▸ `GET /households`

Returns an array of households created by users.

**Sample query**

```URL
/households
```
**Example response**

```JSON
[
{
  "id": 4,
  "name": "nameTest",
  "created_at": "04:51:50 GMT-0700 (Mountain Standard Time)"
    }
]
```

- **`id`**`- string` - uuid of an household post
- **`name`**`- string` - the name of household
- **`created_at`**`- string` - timestamp in ISO format denoting when the household was submitted

### ▸ `POST /households`

A new houseold is created via add households form.

**Example request**

```JavaScript
{
 "name" : "Jackson"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 48,
    "name": "Jackson",
    "created_at": "08:40:50 GMT-0700 (Mountain Standard Time)"
}
```

### ▸ `DELETE /households`

This endpoint allows a user to remove a household, specified by `household_id`.

If no household could be found by `household_id`, the server responds with a status `400`.

### Kids Endpoints

### ▸ `GET /kids`

Returns an array of children created by users.

**Sample query**

```URL
/kids
```
**Example response**

```JSON
{
  "id": 6,
  "name": "testName6",
  "dob": "12/13/2015, 12:00:00 AM",
  "household_id": 4,
  "created_at": "12/29/2019, 5:37:12 PM"
 }
```

- **`id`**`- string` - uuid of an household post
- **`name`**`- string` - the name of child
- **`dob`**` - string` - date of birth
- **`created_at`**`- string` - timestamp in ISO format denoting when the household was submitted

### ▸ `POST /kids`

A new child is created via add children form.

**Example request**

```JavaScript
{
 "name" : "kid5",
 "dob" : "12/13/2015",
 "houehold_id" : "4"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 34,
    "name": "kid5",
    "dob": "12/13/2015, 12:00:00 AM",
    "household_id": 4,
    "created_at": "2/10/2020, 12:32:19 AM"
}
```

### ▸ `DELETE /kids`

This endpoint allows a user to remove a child, specified by `kid_id`.

If no household could be found by `kid_id`, the server responds with a status `400`.

### Actions Endpoints

### ▸ `GET /actions`

Returns an array of actions created by users.

**Sample query**

```URL
/actions
```
**Example response**

```JSON
{
  "id": 61,
  "description": "Test description of action",
  "kid_id": 1,
  "polarity": true,
  "created_at": "2020-02-10T08:02:54.165Z"
}
```

- **`id`**`- string` - uuid of an household post
- **`description`**`- string` - description of action performed by child.
- **`kid_id`**`- string` - id associated with child that performed action 

### ▸ `POST /actions`

A new action is created via add action form.

**Example request**

```JavaScript
{
 "description" : "Played with brother without fighting.",
  "kid_id" : "1"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 61,
    "description": "Test description of action",
    "kid_id": 1,
    "polarity": true,
    "created_at": "2020-02-10T08:02:54.165Z"
}
```

### ▸ `DELETE /actions`

This endpoint allows a user to remove an action, specified by `action_id`.

If no action could be found by `action_id`, the server responds with a status `400`.

## Technology Stack

### Backend
- **Express** for handling API requests
- **Node** for interacting with the file system 
- **Knex.js** for interfacing with the **PostgreSQL** database
- **Postgrator** for database migration
- **Mocha**, **Chai**, **Supertest** for endpoints testing
