const http = require("http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello Samadhan people");
  res.end();
});

server.listen(3000, function () {
  console.log("Server running at http://localhost:3000/");
});
