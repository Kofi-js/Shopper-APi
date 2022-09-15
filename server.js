/* eslint-disable no-console */
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/services/mongo');

const port = process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  await connectDB();

  server.listen(port, () => {
    console.log(`listenig on ${port}`);
  });
}
startServer();
