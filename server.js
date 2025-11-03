const express = require('express');
const dbConfig = require('./config/db');
const app = express();
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());


app.use('/api/task', require('./routes/taskRoute'));
app.use('/api/auth', require('./routes/authRoute'));

app.set('io', io);

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})