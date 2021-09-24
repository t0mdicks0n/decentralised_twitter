pragma solidity ^0.5.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/users/UserStorage.sol";

// This must start with "Test..."
contract TestUserStorage {

  UserStorage userStorage;

  constructor() public {
    userStorage = new UserStorage();
    userStorage.setControllerAddr(address(this));
  }

  // All function names must start with "test..."
  function testCreateFirstUser() public {
    uint _expectedId = 1;

    Assert.equal(userStorage.createUser(
      address(0),
      "Thomas",
      "Thomas",
      "Dickson",
      "I like building stuff",
      "example@example.com"
    ), _expectedId, "Should create user with ID 1");
  }
}
