var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const dotenv = require("dotenv").config();
const db = require("./config/database");

// ************* Routes *************
var indexRouter = require("./routes/index");
var employeeRouter = require("./routes/employee.route");
// var authRouter = require("./routes/auth.route"); // Add this line

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    // Handle incoming messages if needed
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Broadcast function to send token to all connected clients
const broadcastToken = (token) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(token);
    }
  });
};

// Pass the broadcast function to the auth route
app.use((req, res, next) => {
  req.broadcastToken = broadcastToken;
  next();
});

// ************* List Routes *************
app.use("/", indexRouter);
app.use("/employee", employeeRouter);
//app.use("/api/auth", authRouter); // Add this line

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
