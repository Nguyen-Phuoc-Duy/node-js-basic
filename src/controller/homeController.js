// import connection from "../configs/connectDB.js";
import pool from "../configs/connectDB.js";
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
// module.exports = { getHomePage };
export default { getHomePage, getDetailPage };
