const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers.js");

describe("Action Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /actions`, () => {
    context(`Given no action`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/actions")
          .expect(200, []);
      });
    });
  });

  describe(`Post /actions`, () => {
    context(`Create action`, () => {
      beforeEach("insert household", (done) => {
        db.insert({ name: "Jackson" })
          .into("household")
          .returning("*")
          .then(() => {db.insert({
            name: "testKid",
            dob: "12/13/2015, 12:00:00 AM",
            household_id: 1,
            current_stars: 5
          })
            .into("kid")
            .returning("*")
            .then(() => {done()});});
      });
      
      it(`responds with 201 and a new action object`, () => {
        return supertest(app)
          .post("/actions")
          .send({
            description: "Test description",
            kid_id: 1,
            polarity: true
          })
          .then(response => {
            const MtTimezone = response.body.created_at;
            response.body.created_at = MtTimezone.toLocaleString("en-US", {
              timeZone: "America/Colorado"
            });
            expect(201, [
              {
                id: 1,
                description: "Test description",
                kid_id: 1,
                polarity: true,
                created_at: new Date(Date.now()).toTimeString()
              }
            ]);
          });
      });
    });
  });

  describe(`Delete /actions/1`, () => {
    context(`Delete action`, () => {
      beforeEach("insert household", (done) => {
        db.insert({ name: "Jackson" })
          .into("household")
          .returning("*")
          .then((response) => {
            db.insert({
              name: "testKid",
              dob: "12/13/2015, 12:00:00 AM",
              household_id: response[0].id,
              current_stars: 5
            })
              .into("kid")
              .returning("*")
              .then((response) => {
                db.insert({
                  description: "Test description",
                  kid_id: response[0].id,
                  polarity: true
                })
                  .into("action")
                  .returning("*")
                  .then(() => {
                    done();
                  });
              });
          });
      });

      it(`responds with 204`, () => {
          return supertest(app)
          .del("/actions/1")
          .expect(204);
      });
    });
  });
});
