function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          household,
          kid,
          action
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE household_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE kid_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE action_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('household_id_seq', 0)`),
          trx.raw(`SELECT setval('kid_id_seq', 0)`),
          trx.raw(`SELECT setval('action_id_seq', 0)`),
        ])
      )
    )
  }

  module.exports = {
      cleanTables,
  }
