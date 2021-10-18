const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');
const readPost = require('./routes/readPost');

const db = require('./config/database');
const app = express();
app.use(cors());
app.use(express.json())

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// app.get('/', (req, res) => res.send('INDEX'));
const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/readPost', readPost);

// Simple front end for development
app.use(express.static('public'));

app.listen(PORT, console.log(`Server is listening at http://localhost:${PORT}/`));