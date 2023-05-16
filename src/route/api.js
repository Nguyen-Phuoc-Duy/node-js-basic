import express from "express";
import APIController from "../controller/APIController.js";
let router = express.Router();
const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers); //phuong thuc get read data
  router.post("/create-user", APIController.createNewUser); //phuong thuc post create data
  router.put("/update-user", APIController.updateUser); //put => update
  router.delete("/delete-user/:id", APIController.deleteUser); //delete
  return app.use("/api/v1/", router);
};
export default initAPIRoute;
