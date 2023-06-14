// const express = require("express");
import express from "express";
// const path = require("path");
import configViewEngine from "./configs/viewEngine.js";
import path from "path";
import { fileURLToPath } from "url";
import initWebRoute from "./route/web.js";
import * as dotenv from "dotenv";
import e from "express";
// import initAPIRoute from "./route/api.js";
import morgan from "morgan";

// import connection from "./configs/connectDB.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use((req, res, next) => {
  console.log("rrrrr", req.method);
  next();
});
app.use(morgan("combined"));
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);
app.get("/hello", (req, res) => {
  res.send("Hello World! Phuong Phuong");
});
// init api route
// initAPIRoute(app);

/// handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});
// app.get("/1", (req, res) => {
//   res.sendFile(path.join(__dirname, "./index.html"));
// });
// app.get("/", (req, res) => {
//   res.render("test/index.ejs");
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
