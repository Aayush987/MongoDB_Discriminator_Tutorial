const express = require('express');
const connectDB = require('./utils/db');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.use(express.json());

app.use('/api', require('./routes/BasicRoutes'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

connectDB();