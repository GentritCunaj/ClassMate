const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config({ path: "./config.env" });

// Create an instance of Express
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, dbName: "ClassMateMongoDb", useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// GET endpoint to fetch all items from the "contacts" collection
app.get('/contacts', async (req, res) => {
    try {
        // Fetch all contacts from the collection
        const contacts = await mongoose.connection.db.collection('Contacts').find().toArray();
        res.json(contacts); // Return the contacts as JSON response
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a room
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    // Listen for message from client
    socket.on('sendMessage', (data) => {
        const { room, message } = data;

        // Broadcast message to everyone in the room
        io.to(room).emit('receiveMessage', { message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
