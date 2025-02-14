var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

// mysql connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', //
  user: 'root',
  password: 'root/kali',
  database: 'vue_one'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Xatolik:', err);
      res.status(500).send("Server xatoligi");
    } else {
      var dates = results.map(row => {
        return new Date(row.created).toISOString().split('T')[0]; 
      });
      res.render('dashboard', { users: results, dates });
    }
  });
});

// Delete user
router.post("/", (req, res) => {
  var id = req.body.userId;
  console.log(id);

  const query = 'DELETE FROM data WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('O\'chirishda xatolik yuz berdi.');
    }

    res.redirect('/dashboard');
  });
});

// PUT method to update login and password
router.put("/", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const id = req.body.id;

  const query = 'UPDATE data SET login = ?, password = ? WHERE id = ?';
  db.query(query, [login, password, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating user' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  });
});

module.exports = router;
