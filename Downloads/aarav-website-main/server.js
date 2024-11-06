const express = require('express');
const cors = require('cors');
const path = require('path');
const sendMail = require('./sendMail'); // Import the sendMail function
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve all static files in the public folder

app.post('/send-email', async (req, res) => {
    const { name, email, phone } = req.body; // Destructure name, email, and phone from the request body
    try {
        await sendMail({ name, email, phone }); // Pass the whole object to sendMail
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
