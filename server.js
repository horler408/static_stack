const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 5050;
app.set("port", port);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
