const express = require('express');
const dbConfig = require('./config/db');
const app = express();

app.use(express.json());



app.use('/api/taks', require('./routes/taskRoute'));
// app.use('/api/auth', require('./routes/authRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})