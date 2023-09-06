const http = require('http');
const fs = require('fs');
const SerialPort = require('serialport');
const express = require('express');
const socketIO = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = new SerialPort('COM8', {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

const parser = port.pipe(new SerialPort.parsers.Readline({ delimiter: '\r\n' }));

const index = fs.readFileSync('index.html', 'utf8');
const apiUrl = 'http://192.168.1.70:8000/api/rutas/get_routes';

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);
});

io.on('connection', (socket) => {
  console.log('Node is listening to port');
});

parser.on('data', (data) => {
  console.log('Received data from port: ' + data);
  io.emit('data', data);
  sendCard(apiUrl, data);
});

async function sendCard(url, mac) {
  try {
    const response = await axios.get(url, { params: { mac } });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});