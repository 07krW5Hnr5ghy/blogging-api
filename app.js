require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const {db} = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes

// Test DB Connection
db.connect((err)=>{
    if(err){
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Database connected successfully');
    // Start server
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}`);
    });
});