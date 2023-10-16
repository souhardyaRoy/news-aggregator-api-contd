process.env.Node_env = "test";
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
let Server = require("../../index");
const chai = require("chai");
chai.use(chaiHttp);
describe("verify the sign up flow", () => {
  let signUp = {
    username: "ergnerghef",
    password: "souhardyargmom",
    email: "souhardyaroy79@gmail.com",
  };

  it("succesfull sign up", (done) => {
    chai
      .request(Server)
      .post("/newsApp/register")
      .send(signUp)
      .end((err, res) => {
        expect(res.status).equal(201);
        done();
      });
  });
});

describe("verify sign in flow", () => {
  beforeEach((done) => {
    let signUp = {
      username: "ergnerghef",
      password: "souhardyargmom",
      email: "souhardyaroy79@gmail.com",
    };
    chai
      .request(Server)
      .post("/newsApp/register")
      .send(signUp)
      .end((err, res) => {
        done();
      });
  });

  it("succesfull sign in", (done) => {
    let signInbody = {
      password: "souhardyargmom",
      email: "souhardyaroy79@gmail.com",
    };
    chai
      .request(Server)
      .post("/newsApp/login")
      .send(signInbody)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });
});
