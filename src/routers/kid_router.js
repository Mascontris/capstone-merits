const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const kidService = require('../services/kid_service')
const kidRouter = express.Router()
const bodyParser = express.json()

const serializeKid = kid => ({
  id: parseInt(kid.id),
  name: xss(kid.name),
  dob: kid.dob.toLocaleString(),
  household_id: kid.household_id,
  current_stars: kid.current_stars,
  created_at: kid.created_at.toLocaleString()
})

//Get all kids
kidRouter
  .route('/kids')
  .get((req, res, next) => {
    kidService.getAllKids(req.app.get('db'))
      .then(kids => {
        res.json(kids.map(serializeKid))
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ['name', 'dob', 'household_id', 'current_stars']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

     const { name, dob, household_id, current_stars } = req.body

     const stars = Number(current_stars)

    if (!Number.isInteger(stars) || stars < 0 || stars > 5) {
      logger.error(`Invalid number of stars '${stars}' supplied`)
      return res.status(400).send({
        error: { message: `'stars' must be a number between 0 and 5` }
      })
    }

     const newKid = { name, dob, household_id, current_stars }

    kidService.insertKid(
      req.app.get('db'),
      newKid
    )
      .then(kid => {
        logger.info(`Kid with id ${kid.id} created.`)
        res
          .status(201)
          .location(`/households/${kid.id}`)
          .json(serializeKid(kid))
      })
      .catch(next)
  })

//Get kid by id
kidRouter
  .route('/kids/:kid_id')
  .all((req, res, next) => {
    const { kid_id } = req.params
    kidService.getById(req.app.get('db'), kid_id)
      .then(kid => {
        if (!kid) {
          logger.error(`Kid with id ${kid_id} not found.`)
          return res.status(404).json({
            error: { message: `Kid Not Found` }
          })
        }
        res.kid = kid
        next()
      })
      .catch(next)
  })
  .get((req, res) => {
    res.json(serializeKid(res.kid))
  })
  .delete((req, res, next) => {
    const { kid_id } = req.params
    kidService.deleteKid(
      req.app.get('db'),
      kid_id
    )
      .then(kidAffected => {
        logger.info(`Kid with id ${kid_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = kidRouter