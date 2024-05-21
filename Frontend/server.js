const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config.env' });
const { roomHandler } = require('./roomHandler');
const { v4: uuidV4 } = require('uuid');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server,{
    cors:{
        origin: '*',
        methods:["GET","POST"]
    }
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, dbName: 'ClassMateMongoDb', useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// GET endpoint to fetch all items from the "contacts" collection
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await mongoose.connection.db.collection('Contacts').find().toArray();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


// Start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
