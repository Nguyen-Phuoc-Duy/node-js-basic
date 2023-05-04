import express from "express";
let router = express.Router();
import homeController from "../controller/homeController.js";
const initWebRoute = (app) => {
  //   app.METHOD(PATH, HANDLER);
  //   router.get("/", (req, res) => {
  //     res.render("test/index.ejs");
  //   });
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.get("/", homeController.getHomePage);
  router.get("/home", (req, res) => {
    res.send("Hello World! Phuong Phuong");
  });
  return app.use("/", router);
};
export default initWebRoute;
