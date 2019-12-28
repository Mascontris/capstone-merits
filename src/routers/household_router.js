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
  created_at: household.created_at
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
  .post(bodyParser, (req, res, next) => {
    for (const field of ['name', 'password']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

     const { name, password } = req.body

     const newHousehold = { name, password }

    HouseholdsService.insertHousehold(
      req.app.get('db'),
      newHousehold
    )
      .then(household => {
        logger.info(`household with id ${household.id} created.`)
        res
          .status(201)
          .location(`/households`)
          //.location(`/households/${household.id}`)
          .json(serializeHousehold(household))
      })
      .catch(next)
  })

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