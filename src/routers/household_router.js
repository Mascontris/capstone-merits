const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const householdService = require("../services/household_service");
const householdRouter = express.Router();
const bodyParser = express.json();

const serializeHousehold = household => ({
  id: parseInt(household.id),
  name: xss(household.name),
  created_at: household.created_at.toTimeString()
});

//Get all households
householdRouter
  .route("/households")
  .get((req, res, next) => {
    householdService
      .getAllHouseholds(req.app.get("db"))
      .then(households => {
        res.json(households.map(serializeHousehold));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ['name']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

     const { name } = req.body

     const newHousehold = { name }

    householdService.insertHousehold(
      req.app.get('db'),
      newHousehold
    )
      .then(household => {
        logger.info(`Household with id ${household.id} created.`)
        res
          .status(201)
          .location(`/households`)
          .json(serializeHousehold(household))
      })
      .catch(next)
  })

//Get household by id
householdRouter
  .route("/households/:household_id")
  .all((req, res, next) => {
    const { household_id } = req.params;
    householdService
      .getById(req.app.get("db"), household_id)
      .then(household => {
        if (!household) {
          logger.error(`Household with id ${household_id} not found.`);
          return res.status(404).json({
            error: { message: `Household Not Found` }
          });
        }
        res.household = household;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeHousehold(res.household));
  })
  .delete((req, res, next) => {
    const { household_id } = req.params;
    householdService
      .deleteHousehold(req.app.get("db"), household_id)
      .then(householdAffected => {
        logger.info(`Household with id ${household_id} deleted.`);
        res
          .status(204)
          //.location isn't routing the page to the table ???
          .location(`/Login`)
          .end();
      })
      .catch(next);
  });

module.exports = householdRouter;
