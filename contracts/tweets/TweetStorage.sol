pragma solidity ^0.5.10;

// Import the BaseStorage contract
import '../helpers/BaseStorage.sol';

contract TweetStorage is BaseStorage {

  mapping(uint => Tweet) public tweets;

    struct Tweet {
      uint id;
      string text;
      uint userId;
      uint postedAt;
    }

    uint latestTweetId = 0;

    function createTweet(
      uint _userId,
      string memory _text
    ) public onlyController returns(uint _newTweetId) {
      latestTweetId++;

      tweets[latestTweetId] = Tweet(latestTweetId, _text, _userId, now);

      return latestTweetId;
    }

}
