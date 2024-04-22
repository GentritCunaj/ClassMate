const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config({ path: "./config.env" });

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, dbName: "ClassMateMongoDb",useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// GET endpoint to fetch all items from the "books" collection
app.get('/contacts', async (req, res) => {
    try {
        // Fetch all books from the collection
        const contacts = await mongoose.connection.db.collection('Contacts').find().toArray();
        res.json(contacts); // Return the books as JSON response
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal server error" });
    } 
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
