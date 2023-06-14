import pool from "../configs/connectDB.js";
// postman http://localhost:3000/api/v1/...
let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.status(200).json({
    ////json api
    messge: "ok",
    data: rows,
  });
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      messge: "missing required params",
    });
  }
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    messge: "ok111",
  });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      messge: "missing required params",
    });
  }
  await pool.execute(
    `update users set firstName= ?, lastName= ?, email= ?, address= ? where id= ?`,
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    messge: "ok222",
  });
};
let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      messge: "missing required params",
    });
  }
  await pool.execute("delete from users where id = ?", [userId]);
  return res.status(200).json({
    messge: "ok333",
  });
};
// npm install --save-excact multer@1.4.3
export default { getAllUsers, createNewUser, updateUser, deleteUser };
