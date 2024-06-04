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
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, dbName: "ClassMateMongoDb", useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Define Contact Model
const Contact = mongoose.model("Contact", contactSchema);

// POST endpoint to add a new contact
app.post('/contacts', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message }); 
        await contact.save();
        console.log('Received contact:', req.body);
        res.status(201).json({ message: "Contact added successfully" });
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint to fetch all contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE endpoint to delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
