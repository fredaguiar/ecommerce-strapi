const express = require("express");
// const path = require('path');

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

server.use(express.static(DIST));

const NODE_PORT = process.env.NODE_PORT || 3000;
console.log("🚀 ~ file: server.js:23 ~ NODE_PORT:", NODE_PORT);
console.log("🚀 ~ file: server.js:23 ~ STRAPI_HOST:", process.env.STRAPI_HOST);
server.listen(NODE_PORT, () => {
  console.log(`App listening on port ${NODE_PORT}!`);
});
