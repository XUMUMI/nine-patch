import fs from "fs";
import path from "path";
import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, true).pathname;
  pipeFileToResponse(res, pathname === "/index" ? "../index.js" : pathname);
});

server.listen(0, () => {return console.log(`Server running at http://localhost:${server.address().port}/`);}).on("error", err => {return console.error("Server error:", err);});

function pipeFileToResponse(res, file) {
  let filePath = getFilePath("sandbox", file === "/" ? "index.html" : file);
  filePath = fs.existsSync(filePath) ? filePath : getFilePath("/", file);
  if (fs.existsSync(filePath)) {
    res.writeHead(200, { "Content-Type": getMimeType(filePath) });
    fs.createReadStream(filePath).pipe(res);
  }
}

const getFilePath = (root, file) => {return path.join(path.resolve(), root, file);};

function getMimeType(file) {
  const extname = path.extname(file);
  const typeMap = {
    ".js": "text/javascript", ".css": "text/css", ".png": "image/png",
  };
  return typeMap[extname] || "text/html";
}
