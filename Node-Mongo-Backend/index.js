const express = require('express'); 
const app  =express(); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  
dotenv.config();
app.use(express.json()) ;  
app.use(express.urlencoded({ extended: true }));
app.use(cors()) ;  
//rquiring the router here for developers 
const devRouter = require('./routes/dev');
app.use("/dev", devRouter) 


app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
    // MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
})