const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}
);



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);
// const socket = io.listen(3000);
// const io = require('socket.io');
// io.listen(3000);

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

} 
);
 

// const io = require('socket.io').listen(server);


// const express = require('express')
// const app = express()
// const http = require('http').createServer(app)

// const PORT = process.env.PORT || 3000

// http.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })

// app.use(express.static(__dirname + '/public'))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// // Socket 
// const io = require('socket.io')(http)

// io.on('connection', (socket) => {
//     console.log('Connected...')
//     socket.on('message', (msg) => {
//         socket.broadcast.emit('message', msg)
//     })

// })