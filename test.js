const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server  =  require('./index');

const ADDR = 'http://localhost:8080';

chai.should();

chai.use(chaiHTTP);

describe('Points API',  () => {

  // POST transaction route
  describe("POST /points", () => {
    it("This should POST a regular transaction", (done) => {
      const trans = {"payer": "DANNON", "points": 1000, "timestamp": "2020-10-31T10:00:00Z"}
      chai.request(ADDR)
          .post("/points")
          .send(trans)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.transaction).to.deep.equal(trans);
          done();
          });
    });

    it("This should NOT POST new transaction (missing data)", (done) => {
      const trans = {"payer": "DANNON", "timestamp": "2020-10-31T1000:00Z"}
      chai.request(ADDR)
          .post("/points")
          .send(trans)
          .end((err, res) => {
            res.should.have.status(400);
          done();
          });
    });
  });

  describe("GET /points", () => {
    it("This should GET all payers' points", (done) => {
      const result = {"DANNON":  1000};
      chai.request(ADDR)
        .get("/points")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal(result);
        done();
        });
    });
  });

  describe("POST /points/spend", () => {
    it("This should spend specified points and return correct response", (done) => {
      const pointsToSpend = {"points":  850}
      const result  = [{"payer": "DANNON", "points": -850}]
      chai.request(ADDR)
        .post("/points/spend")
        .send(pointsToSpend)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal(result)
        done();
        });
    });

    it("This should not spend more points than user has", (done) => {
      const pointsToSpend = {"points":  200}
      chai.request(ADDR)
        .post("/points/spend")
        .send(pointsToSpend)
        .end((err, res) => {
          res.should.have.status(400);
        done();
        });
    });
  });

  describe("POST /points", () => {
    it("this should NOT POST negative points transaction when points unavailable", (done) => {
      const trans = {"payer": "DANNON", "points": -200, "timestamp": "2020-10-31T10:00:00Z"}
      chai.request(ADDR)
          .post("/points")
          .send(trans)
          .end((err, res) => {
            res.should.have.status(400);
          done();
          });
    });
  });
});