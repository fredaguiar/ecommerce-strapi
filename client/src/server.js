const express = require("express");
const DIST = __dirname; //path.resolve(__dirname, 'dist');
const server = express();

server.get("/version", (req, res) => {
  res.json({ version: "1.0" });
});

server.get("/", (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>> req.url", req.url);

  res.sendFile(`${DIST}/index.html`, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.get("/checkout/success", (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>> req.url", req.url);

  res.sendFile(`${DIST}/index.html`, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.use(express.static(DIST));

const NODE_PORT = process.env.NODE_PORT;
server.listen(NODE_PORT, () => {
  console.log(`App listening on port ${NODE_PORT}!`);
});

function closeGracefully(signal) {
  console.log(`Received signal to terminate: ${signal}`);
  process.kill(process.pid, signal);
}

process.once("SIGINT", closeGracefully);
process.once("SIGTERM", closeGracefully);
