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
{
    "id": 48,
    "name": "Jackson",
    "created_at": "08:40:50 GMT-0700 (Mountain Standard Time)"
}

### ▸ `DELETE /api/images/:submission_id`

This endpoint allows a registered and logged in user to remove an image that they posted from the database, specified by `submission_id`. If the `id` of the user making the <small>DELETE</small> request does not match the `user_id` of the submission, the server responds with a status `401`.

If no submission could be found by `submission_id`, the server responds with a status `400`.

### Comments Endpoints

### ▸ `GET /api/comments/:submission_id`

Returns an array of comments associated with an image submission specified by `submission_id`. Every comment contains a `user_id` of the user that posted the comment, but the displayed username is randomly generated on the client to maintain anonymity.

If no submission could be found by `submission_id`, the server responds with a status `404`.

**Example response**

```JSON
[
  {
    "comment_id": "fcf3fa7b-a1ca-4314-bbd5-5dba75ba5991",
    "comment_text": "wow that's wild!",
    "comment_timestamp": "2019-12-12T23:32:14.876Z",
    "submission_id": 42,
    "user_id": "7ad87401-dda8-48f0-8ed8-a6bc9756e53c"
  }
]
```

- **`comment_id`**`- string` - uuid of a comment
- **`comment_text`**`- string` - the contents of a posted comment
- **`comment_timestamp`**`- string` - timestamp in ISO format denoting when the comment was created
- **`submission_id`**`- integer` - the id of an image submission that the comment was posted to
- **`user_id`**`- string` - uuid of the user that posted the comment

### ▸ `POST /api/comments/:submission_id`

This endpoint allows a registered and logged in user to post a comment to an image submission specified by `submission_id`.

If no submission could be found by `submission_id`, the server responds with a status `404`.

**Example request**

```JSON
{
  "user_id": "7ad87401-dda8-48f0-8ed8-a6bc9756e53c",
  "comment_text": "wow that's wild!"
}
```

### Users Endpoints

### ▸ `GET /api/users/:user_id`

Returns the data for the user specified by `user_id`.

If no user could be found by `user_id`, the server responds with a status `400`.

**Example response**

```JSON
{
  "id": "7ad87401-dda8-48f0-8ed8-a6bc9756e53c",
  "karma_balance": 25
}
```

> _The **karma_balance** (i.e. the number of remaining upvotes that a user has) of each registered user in the Anonygram database is reset to 25 every hour, whether or not any karma was spent in that hour._

> _Note that the `username` of the specified user is not included in the response so as to maintain anonymity._

## Technology Stack

### Backend
- **Express** for handling API requests
- **Node** for interacting with the file system 
- **Multer** for handling file uploads
- **AWS SDK** for interfacing with Amazon's S3 service
- **Sharp** for image manipulation / compression
- **Google Vision** for image recognition / content arbitration
- **Google Places** for retrieving local business images
- **Knex.js** for interfacing with the **PostgreSQL** database
- **Postgrator** for database migration
- **Mocha**, **Chai**, **Supertest** for endpoints testing
- **JSON Web Token**, **bcryptjs** for user authentication / authorization
