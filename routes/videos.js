const express = require("express");
const router = express.Router();
const videosData = require("../data/videos.json")

// get all videos endpoint:

router.get("/",(request,response)=>{
    response.json(videosData)
})

module.exports = router;