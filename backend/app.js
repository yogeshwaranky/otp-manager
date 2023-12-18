require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");
const PORT = 4001


// Import required modules

const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const { getDashboardData } = require("./controllers/usercontrollers");

// Create Express app

const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

// Set up WebSocket connection
io.on("connection", (socket) => {
    console.log("Client connected");

    // Send initial data to the client on connection
    getDashboardData().then((data) => {
        socket.emit("dashboardData", data);
    });
});
// middleware
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(PORT,()=>{
    console.log(`Server start at Port No :${PORT}`)
})
