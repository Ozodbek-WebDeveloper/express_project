var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

// mysql connection (pool)
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root/kali',
  database: 'vue_one'
});

/* GET signIn page. */
router.get('/', function(req, res, next) {
  res.render('sign_in');
});

// POST signIn page
router.post('/', (req, res) => {
  var username = req.body["username"];
  var password = req.body["password"];

  const query = 'SELECT * FROM data WHERE login = ?';
  db.query(query, [username], (err, results) => {
      if (err) {
          console.error('Xatolik:', err);
          res.status(500).send("Server xatoligi");
      } else if (results.length > 0) {
          const user = results[0];

          if (password === user.password) {
              res.redirect('/dashboard');
          } else {
              res.send("Parol noto'g'ri");
          }
      } else {
          res.send("Bunday foydalanuvchi yo'q.");
      }
  });
});

module.exports = router;
