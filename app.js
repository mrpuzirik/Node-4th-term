const express = require('express');
const session = require('express-session');
const sportController = require('./controllers/sportController');

const adminRoutes = require('./controllers/adminController');
const authRoutes = require('./controllers/authController');



const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'admin',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', sportController);

app.use('/admin', adminRoutes);
app.use('/login', authRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});