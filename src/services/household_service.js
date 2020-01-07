const householdsService = {
    getAllHouseholds(knex) {
      return knex.select('*').from('household')
    },
    getById(knex, id) {
       return knex.from('household').select('*').where('id', id).first()
    },
    insertHousehold(knex, newHousehold) {
      return knex
        .insert(newHousehold)
        .into('household')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    deleteHousehold(knex, household_id) {
      return knex('household')
        .where({ id: household_id })
        .delete()
    },
    // updateHousehold(knex, id, newHouseholdFields) {
    //   return knex('household')
    //     .where({ id })
    //     .update(newHouseholdFields)
    // },
  }
  
  module.exports = householdsService