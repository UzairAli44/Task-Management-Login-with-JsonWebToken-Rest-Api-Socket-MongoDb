const express = require('express');
const dbConfig = require('./config/db');
const app = express();

app.use(express.json());



app.use('/api/taks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})