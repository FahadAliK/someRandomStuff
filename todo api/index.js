const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/todos', todoRoutes);

app.get('/', function(req, res) {
    res.send('HELLO FROM THE ROOT ROUTE.!!');
});

app.listen(3000, function() {
    console.log('Serving at port 3000.!!');
});
