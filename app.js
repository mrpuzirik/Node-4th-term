const express = require('express');
const session = require('express-session');
const sportController = require('./controllers/sportController');

const adminRoutes = require('./controllers/adminController');
const authRoutes = require('./controllers/authController');
const sequelize = require("./dbORM");



const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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

app.use('/api/admin', require('./controllers/adminApiController'));
app.use('/api', require('./controllers/sportApiController'));
app.use('/api', require('./controllers/authApiController'));



const PORT = 3000;
sequelize.sync({ force: false })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error('Unable to sync the database:', err);
    });