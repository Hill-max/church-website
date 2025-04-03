const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
