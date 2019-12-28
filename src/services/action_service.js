const ActionService = {
    getAllActions(knex) {
      return knex.select('*').from('action')
    },
    getById(knex, id) {
      return knex.from('action').select('*').where('id', id).first()
    },
    insertAction(knex, newAction) {
      return knex
        .insert(newAction)
        .into('action')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    // deleteHousehold(knex, id) {
    //   return knex('households')
    //     .where({ id })
    //     .delete()
    // },
    // updateHousehold(knex, id, newHouseholdFields) {
    //   return knex('households')
    //     .where({ id })
    //     .update(newHouseholdFields)
    // },
  }
  
  module.exports = ActionService