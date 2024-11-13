var express = require('express');
var router = express.Router();
const mysql = require('mysql');

// mysql connection (pool)
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '245781',
  database: 'project'
});

/* GET signUp page. */
router.get('/', function(req, res, next) {
  res.render('sign_up', { title: 'Express' });
});

// POST signUp page
router.post('/', function(req, res, next) {
  var username = req.body["username"];
  var password = req.body["password"];
  var qryString = `INSERT INTO users (login, password) VALUES (?, ?)`; // SQL injection-ning oldini olish uchun parametrli so‘rov

  // SQL so‘rovini bajarish
  db.query(qryString, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    // Yangi foydalanuvchi qo‘shilgandan so‘ng, dashboard sahifasiga qaytish
    res.redirect("/dashboard");
  });
});

module.exports = router;
