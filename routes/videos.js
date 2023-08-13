const { response } = require("express");
const express = require("express");
const router = express.Router();
const videosData = require("../data/videos.json");
const crypto = require("crypto");

/*  a list of random names,channel names,timestamps,views,likes*/
const randomNames = [
  "nick",
  "jack",
  "alice",
  "moises",
  "pervis",
  "piero",
  "reascos",
];
const channelNames = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Neymar Jr",
  "Kylian Mbappé",
  "Robert Lewandowski",
  "Mohamed Salah",
  "Kevin De Bruyne",
  "Raheem Sterling",
];

const randomTimestamps = [
  1643654400000, 1673019200000, 1657296000000, 1675708800000, 1688352000000,
  1625625600000, 1667328000000,
];

const randomViews = [
  245345, 987652, 12345, 876543, 54321, 789012, 456789, 102938, 543210, 678901,
];

const randomLikes = [234, 567, 1234, 987, 345, 789, 456, 876, 654, 321];

/* function for accessing a random index from an array*/
function randomizer(randomList) {
  const randomIndex = Math.floor(Math.random() * randomList.length);
  return randomList[randomIndex];
}

// get all videos endpoint:

router.get("/", (request, response) => {
  response.json(videosData);
});

// getting one endpoint
router.get("/:videosId", (request, response) => {
  // getting that specific id from the videos data and checking with the videosId parameter
  const singleVideo = videosData.find((video) => {
    return video.id === request.params.videosId;
  });
  response.json(singleVideo);
});

router.post("/", (request, response) => {
  // need to generate a new id when posting
  const newVideo = {
    id: crypto.randomUUID(),
    timestamp: randomizer(randomTimestamps),
    views: randomizer(randomViews),
    likes: randomizer(randomLikes),
    title: request.body.title,
    description: request.body.description,
    // included the hardcoded static image which is located in the public folder
    image: request.body.image, //using the url in the request body
    channel: randomizer(channelNames),

    // this will be filled with new comments
    comments: [],
  };

  // push the new data to the json
  videosData.push(newVideo);
  // respond to client
  response.status(201).json(newVideo);
});

router.post("/:videoId/comments", (request, response) => {
  // accessing the value of the dyanmic parameter '/:videoId"
  const videoId = request.params.videoId;
  // returning that video with the same id as the value id in the url
  const video = videosData.find((video) => {
    return video.id === videoId;
  });

  // each property is assigned a value which will be displayed on the page when pushing the data
  // the comment porperty is assigned with the value from comment field which was inputted from user in the client side
  const newComment = {
    // calling the randomizer function to select a random name
    name: randomizer(randomNames),
    comment: request.body.comment,
    timestamp: Date.now(),
  };
  // then we push the new comments to that associated/selected video comments array
  video.comments.push(newComment);
});

module.exports = router;
