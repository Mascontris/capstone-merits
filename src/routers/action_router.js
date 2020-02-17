const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const actionService = require('../services/action_service')

const actionRouter = express.Router()
const bodyParser = express.json()

const serializeAction = action => ({
  id: parseInt(action.id),
  description: xss(action.description),
  kid_id: action.kid_id,
  polarity: action.polarity,
  created_at: action.created_at
})

//Gets all actions
actionRouter
  .route('/actions')
  .get((req, res, next) => {
    actionService.getAllActions(req.app.get('db'))
      .then(actions => {
        res.json(actions.map(serializeAction))
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ['description', 'kid_id']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

     const { description, kid_id, polarity } = req.body

    if (typeof polarity !== "boolean") {
      logger.error(`Invalid True/False response '${polarity}' supplied`)
      return res.status(400).send({
        error: { message: `'polarity' must be a True or False` }
      })
    }

     const newAction = { description, kid_id, polarity }

    actionService.insertAction(
      req.app.get('db'),
      newAction
    )
      .then(action => {
        logger.info(`Action with id ${action.id} created.`)
        res
          .status(201)
          .location(`/Actions/${action.id}`)
          .json(serializeAction(action))
      })
      .catch(next)
  })

//Get action by id
actionRouter
  .route('/actions/:action_id')
  .all((req, res, next) => {
    const { action_id } = req.params
    actionService.getById(req.app.get('db'), action_id)
      .then(action => {
        if (!action) {
          logger.error(`Action with id ${action_id} not found.`)
          return res.status(404).json({
            error: { message: `Action Not Found` }
          })
        }
        res.action = action
        next()
      })
      .catch(next)
  })
  .get((req, res) => {
    res.json(serializeAction(res.action))
  })
  .delete((req, res, next) => {
    const { action_id } = req.params
    actionService.deleteAction(
      req.app.get('db'),
      action_id
    )
      .then(actionAffected => {
        logger.info(`Action with id ${action_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = actionRouter