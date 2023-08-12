const { response } = require("express");
const express = require("express");
const router = express.Router();
const videosData = require("../data/videos.json");
const crypto = require("crypto")


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
  response.json(singleVideo)
});

router.post("/",(request,response)=>{
    // need to generate a new id when posting
    const newVideo = {
        id: crypto.randomUUID(),
        title: request.body.title,
        description: request.body.description

    }
    // push the new data to the json
    videosData.push(newVideo)
    // respond to client 
    response.status(201).json(newVideo)
})



module.exports = router;
