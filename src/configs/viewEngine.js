import express from "express";
const configViewEngine = (app) => {
  /// lay anh public
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  /// config den views
  app.set("views", "./src/views");
};
export default configViewEngine;
