import connection from "../configs/connectDB.js";
let getHomePage = (rew, res) => {
  // simple query
  let data = [];
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    // data = results.map((row) => {
    //   data.push({
    //     id: row.id,
    //     firstname: row.firstname,
    //     lastname: row.lastname,
    //     email: row.email,
    //     address: row.address,
    //   });
    // });
    data = results.map((row) => {
      return row;
    });
    return res.render("index.ejs", {
      dataUser:
        // JSON.stringify(
        data,
      test: "test la test",
      // )
    });
  });
};
// module.exports = { getHomePage };
export default { getHomePage };
