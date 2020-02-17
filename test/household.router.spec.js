const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers.js");

describe("Households Endpoints", function() {
  let db;

  //   const {
  //     testUsers,
  //     testArticles,
  //     testComments,
  //   } = helpers.makeArticlesFixtures()

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

  describe(`GET /households`, () => {
    context(`Given no households`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/households")
          .expect(200, []);
      });
    });
  });

  describe(`Post /households`, () => {
    context(`Create household name`, () => {
      it(`responds with 201 and a new household object`, () => {
        return supertest(app)
          .post("/households")
          .send({ name: "Jackson" })
          .then(response => {
            const MtTimezone = response.body.created_at;
            response.body.created_at = MtTimezone.toLocaleString("en-US", {
              timeZone: "America/Colorado"
            });
            expect(201, [
              {
                id: 1,
                name: "Jackson",
                created_at: new Date(Date.now()).toTimeString()
              }
            ]);
          });
      });
    });
  });

  describe(`Delete /households/1`, () => {
    context(`Delete household`, () => {
      beforeEach("insert household", () => {
        db.insert({ name: "Jackson" })
          .into("household")
          .returning("*")
          .then(() => {});
      });

      it(`responds with 204 and deletes household`, () => {
        return supertest(app)
          .del("/households/1")
          .expect(204);
      });
    });
  });
});
