const express = require('express');
const mongo = require('./db');
const cors = require('cors');
require('dotenv').config();
const SignUser = require('./Routes/SignUser');
const DisplayData = require('./Routes/DisplayData');
const OrderData = require('./Routes/OrderData');

const app = express();
const PORT = 5000 || process.env.port

app.use(express.json());
app.use(cors());

mongo();

app.get('/', (req, res) => {
    res.send("Food app");
});

app.use('/api', SignUser);
app.use('/api', DisplayData);
app.use('/api', OrderData);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});