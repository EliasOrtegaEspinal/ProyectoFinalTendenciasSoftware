import { WebSocketServer } from 'ws';
import path from 'path';
import express from 'express';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const server = app.listen(8080);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, '..', 'public')));

wss.on('connection', client => {
  client.on('message', (message, isBinary) => {
    [...wss.clients]
      .filter(c => c !== client)
      .forEach(c => c.send(isBinary ? message.toString() : message));
  });
});