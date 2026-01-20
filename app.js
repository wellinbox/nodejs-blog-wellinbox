const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
connectDB();
const postRoutes = require('./routes/posts');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', postRoutes);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'My Blog' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});