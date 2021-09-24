const UserStorage = artifacts.require('UserStorage')
const UserController = artifacts.require('UserController')

const utils = require('../utils')
const { assertVMException } = utils

contract('users', () => {

  it("can create user with controller", async () => {
    const controller = await UserController.deployed()

    const tx = await controller.createUser(
      "Thomas",
      "Thomas",
      "Dickson",
      "I like building stuff",
      "example@example.com"
    )

    assert.isOk(tx)
  })

  it("can't create user without controller", async () => {
    const storage = await UserStorage.deployed()

    try {
      const tx = await storage.createUser(
        0x0,
        "Thomas",
        "Thomas",
        "Dickson",
        "I like building stuff",
        "example@example.com"
      )
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  })

  it("can get user", async () => {
    const storage = await UserStorage.deployed()
    const userId = 1

    // Get the userInfo array
    const userInfo = await storage.profiles.call(userId)

    // Get the second element (the username)
    const username = userInfo[1]

    const parsed_username = web3.utils
      // Encode the hex value
      .toAscii(username)
      // bytes32 object has to be 32 chars long and will add
      // null values to make it 32 characters, remove those
      .replace(/\u0000/g, '')

    assert.equal(parsed_username, "Thomas")
  });

})
