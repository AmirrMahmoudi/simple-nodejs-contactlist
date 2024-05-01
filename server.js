import http from "http";
import url from "url";

const contactList = [];
const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);

  res.write("");
  res.end();
});

server.listen(3000, () => {
  console.log("HTTp server is listenin on the port 3000");
});
