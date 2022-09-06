/* eslint-disable no-console */
const http = require('http');
const app = require('./src/app');
const { mongoConnect } = require('./src/services/mongo');

const PORT = 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`listenig on ${PORT}`);
  });
}
startServer();
