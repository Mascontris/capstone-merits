const KidService = {
    getAllKids(knex) {
      return knex.select('*').from('kid')
    },
    //getById(knex, id) {
    //   return knex.from('kid').select('*').where('id', id).first()
    //},
    // insertHousehold(knex, newHousehold) {
    //   return knex
    //     .insert(newHousehold)
    //     .into('households')
    //     .returning('*')
    //     .then(rows => {
    //       return rows[0]
    //     })
    // },
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
  
  module.exports = KidService