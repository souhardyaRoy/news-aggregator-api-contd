const expect = require("chai").expect;
const User = require("../../src/model/User.schema");
const sinon = require("sinon");

describe("1. User creation using mocking ", () => {
  it("Creating Uerusing mock", async () => {
    const user = new User({
      username: "gdgdgnd",
      password: "dfgndfgh",
      email: "vfgfgd",
    });
    let saveStub = sinon.stub(User.prototype, "save");
    const mockUser = {
      _id: "efgrfdf",
      username: "gdgdgnd",
      password: "dfgndfgh",
      email: "vfgfgd",
    };
    saveStub.resolves(mockUser);
    const result =await user.save();
    expect(result).to.deep.equal(mockUser);
  });
});
