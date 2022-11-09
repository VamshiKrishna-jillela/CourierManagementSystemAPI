const http = require("http");
const app = require("./app");
const server = http.createServer(app);

//development server...
if (process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});