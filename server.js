const http = require("http");
const fs = require("fs");
const path = require("path");
const { subscribe } = require("./agui/emitter");

let clients = [];

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const html = fs.readFileSync("ui/index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  // SSE endpoint
  else if (req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });

    clients.push(res);

    req.on("close", () => {
      clients = clients.filter((c) => c !== res);
    });
  }

  // Approval endpoint
  else if (req.url === "/approve") {
    process.stdin.emit("data"); // simulate ENTER
    res.writeHead(200);
    res.end("approved");
  }

  else {
    res.writeHead(404);
    res.end();
  }
});

// Send AG-UI events to browser
subscribe((event) => {
  clients.forEach((res) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  });
});

server.listen(3000, () => {
  console.log("Web UI running at http://localhost:3000");
});

