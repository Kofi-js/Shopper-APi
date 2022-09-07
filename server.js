/* eslint-disable no-console */
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/services/mongo');

const PORT = 8000;

const server = http.createServer(app);


async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`listenig on ${PORT}`);
  });
}
startServer();
