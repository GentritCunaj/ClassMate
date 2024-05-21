const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidV4 } = require('uuid');
const app = express();
const server = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'build')));

const io = require('socket.io')(server,{
    cors:{
        origin: '*',
        methods:["GET","POST"]
    }
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, dbName: 'ClassMateMongoDb', useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // GET endpoint to fetch all items from the "contacts" collection
// app.get('/contacts', async (req, res) => {
//     try {
//         const contacts = await mongoose.connection.db.collection('Contacts').find().toArray();
//         res.json(contacts);
//     } catch (error) {
//         console.error('Error fetching contacts:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    console.log("connected");
    socket.on("join room", roomID => {
        if (users[roomID]) {
        
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all-users", ["gentriti","kari"]);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
