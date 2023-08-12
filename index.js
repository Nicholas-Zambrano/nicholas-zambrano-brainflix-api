
require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.PORT
const cors = require("cors")
const videosRoutes = require("./routes/videos")

// middleware
app.use(express.json())
app.use(cors());

// this is the path in the url
app.use("/videos", videosRoutes)

app.listen(port,()=>{
    console.log(`server is on port ${port}`);
})


// allowing to display the images via static
app.use("/public",express.static("./public/images"))

