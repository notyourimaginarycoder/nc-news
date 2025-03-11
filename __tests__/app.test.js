const endpointsJson = require("../endpoints.json");
const app = require("../app.js")
const seed = require("../db/seeds/seed.js")
const db = require("../db/connection.js")
const data = require("../db/data/test-data/index.js")
const request = require("supertest")

beforeEach(() => {
  return seed(data)
})

afterAll(() => {
  return db.end()
})

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('get /api error handling', () => {
  test('404: error handling', () => {
    return request(app)
    .get('/this-is-a-test')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('not found')
    })
  })
})