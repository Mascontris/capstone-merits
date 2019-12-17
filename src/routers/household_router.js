const express = require('express')
const { isWebUri } = require('valid-url')
const xss = require('xss')
const logger = require('../logger')
const householdService = require('../services/household_service')

const householdRouter = express.Router()
const bodyParser = express.json()

const serializeHousehold = household => ({
  id: household.id,
  name: xss(household.name),
  password: household.password,
  created_at: household
})

householdRouter
  .route('/households')
  .get((req, res, next) => {
    householdService.getAllHouseholds(req.app.get('db'))
      .then(households => {
        res.json(households.map(serializeHousehold))
      })
      .catch(next)
  })
//   .post(bodyParser, (req, res, next) => {
//     for (const field of ['title', 'url', 'rating']) {
//       if (!req.body[field]) {
//         logger.error(`${field} is required`)
//         return res.status(400).send({
//           error: { message: `'${field}' is required` }
//         })
//       }
//     }

//     const { title, url, description, rating } = req.body

//     const ratingNum = Number(rating)

//     if (!Number.isInteger(ratingNum) || ratingNum < 0 || ratingNum > 5) {
//       logger.error(`Invalid rating '${rating}' supplied`)
//       return res.status(400).send({
//         error: { message: `'rating' must be a number between 0 and 5` }
//       })
//     }

//     if (!isWebUri(url)) {
//       logger.error(`Invalid url '${url}' supplied`)
//       return res.status(400).send({
//         error: { message: `'url' must be a valid URL` }
//       })
//     }

//     const newBookmark = { title, url, description, rating }

//     BookmarksService.insertBookmark(
//       req.app.get('db'),
//       newBookmark
//     )
//       .then(bookmark => {
//         logger.info(`Bookmark with id ${bookmark.id} created.`)
//         res
//           .status(201)
//           .location(`/bookmarks/${bookmark.id}`)
//           .json(serializeBookmark(bookmark))
//       })
//       .catch(next)
//   })

// bookmarksRouter
//   .route('/bookmarks/:bookmark_id')
//   .all((req, res, next) => {
//     const { bookmark_id } = req.params
//     BookmarksService.getById(req.app.get('db'), bookmark_id)
//       .then(bookmark => {
//         if (!bookmark) {
//           logger.error(`Bookmark with id ${bookmark_id} not found.`)
//           return res.status(404).json({
//             error: { message: `Bookmark Not Found` }
//           })
//         }
//         res.bookmark = bookmark
//         next()
//       })
//       .catch(next)
//   })
//   .get((req, res) => {
//     res.json(serializeBookmark(res.bookmark))
//   })
//   .delete((req, res, next) => {
//     const { bookmark_id } = req.params
//     BookmarksService.deleteBookmark(
//       req.app.get('db'),
//       bookmark_id
//     )
//       .then(numRowsAffected => {
//         logger.info(`Bookmark with id ${bookmark_id} deleted.`)
//         res.status(204).end()
//       })
//       .catch(next)
//   })

module.exports = householdRouter