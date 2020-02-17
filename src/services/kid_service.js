const KidService = {
    getAllKids(knex) {
      return knex.select('*').from('kid')
    },
    getById(knex, id) {
      return knex.from('kid').select('*').where('id', id).first()
    },
    insertKid(knex, newKid) {
      return knex
        .insert(newKid)
        .into('kid')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    deleteKid(knex, kid_id) {
      return knex('kid')
        .where({ id: kid_id })
        .delete()
    },
  }
  
  module.exports = KidService