// import connection from "../configs/connectDB.js";

import pool from "../configs/connectDB.js";
import multer from "multer";
let getHomePage = async (rew, res) => {
  // simple query
  let data = [];
  // connection.query("SELECT * FROM `users`", function (err, results, fields) {
  //   // data = results.map((row) => {
  //   //   data.push({
  //   //     id: row.id,
  //   //     firstname: row.firstname,
  //   //     lastname: row.lastname,
  //   //     email: row.email,
  //   //     address: row.address,
  //   //   });
  //   // });
  //   ///////////////
  //   data = results.map((row) => {
  //     return row;
  //   });
  //   // return res.render("index.ejs", {
  //   //   dataUser:
  //   //     /////////chuyen dang sting de hien thi ben ejs
  //   //     // JSON.stringify(
  //   //     data,
  //   //   test: "test la test",
  //   //   // )
  //   // });
  // });
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  // console.log("=====", rows, "/////", fields);
  return res.render("index.ejs", {
    dataUser:
      /////////chuyen dang sting de hien thi ben ejs
      // JSON.stringify(
      rows,
    test: "test la test",
    // )
  });
  console.log("check rows", rows);
};
let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  // let user = await pool.execute(`SELECT * FROM users where id = ${userId}`);
  let [user] = await pool.execute(`SELECT * FROM users where id = ?`, [userId]);
  // console.log("check request param", user);
  return res.send(`Infomation ${userId} : ${JSON.stringify(user)}`);
  // return res.send(JSON.stringify(user[0]));
};
let createNewUser = async (req, res) => {
  console.log("check req", req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("delete from users where id = ?", [userId]);
  // return res.send(`deleteUser ${req.body.userId}`);
  return res.redirect("/");
};
let deleteUser2 = async (req, res) => {
  let userId = req.params.id;
  await pool.execute("delete from users where id = ?", [userId]);
  // return res.send(`deleteUser ${req.body.userId}`);
  return res.redirect("/");
};
let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM users where id = ?`, [id]);
  // return res.send(`update ${req.params.id}`);
  // return res.send(JSON.stringify(user));
  return res.render("update.ejs", { dataUser: user[0] });
};
let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    `update users set firstName= ?, lastName= ?, email= ?, address= ? where id= ?`,
    [firstName, lastName, email, address, id]
  );
  // console.log("check", req.body);
  return res.redirect("/");
  // return res.send(`save`);
};
let postUpdateUser2 = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  let id = req.params.id;
  // console.log("iddddddddddd", id);
  await pool.execute(
    "update users set firstName= ?, lastName= ?, email= ?, address= ? where id= ?",
    [firstName, lastName, email, address, id]
  );
  // console.log("check", req.body);
  return res.redirect("/");
  // return res.send(`save`);
};

// module.exports = { getHomePage };

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

// const upload = multer().single("profile_pic");
// const uploadMultiple = multer().array("multiple_images", 3);
let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};

let handleUploadMultipleFiles = async (req, res) => {
  // console.log("tttttttttt", req.files);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (req.files.length == 0) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="100" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};
export default {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  deleteUser2,
  postUpdateUser2,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultipleFiles,
};
