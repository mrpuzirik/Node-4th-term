const express = require('express');
const sportController = require('./controllers/sportController');
const adminRoutes = require('./controllers/adminController');



const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', sportController);
app.use('/admin', adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});