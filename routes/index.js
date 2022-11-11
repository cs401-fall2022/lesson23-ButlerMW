var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()


/* GET home page. */
router.get('/', function (req, res, next) {
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      //Query if the table exists if not lets create it on the fly!
      db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
        (err, rows) => {
          if (rows.length === 1) {
            console.log("Table exists!");
            db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
              console.log("returning " + rows.length + " records");
              res.render('index', { title: 'Express Todo List', data: rows });
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(`create table blog (
                     blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     blog_txt text NOT NULL);`,
              () => {
                db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
                  res.render('index', { title: 'Express Todo List', data: rows });
                });
              });
          }
        });
    });
});

router.post('/add', (req, res, next) => {
  console.log("Adding blog to table without sanitizing input! YOLO BABY!!");
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("inserting " + req.body.blog);
      db.run(`insert into blog ( blog_txt) values (?);`, [req.body.blog]);
      //redirect to homepage
      res.redirect('/');
    }
  );
})

router.post('/delete', (req, res, next) => {
  console.log("deleting stuff without checking if it is valid! SEND IT!");
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("inserting " + req.body.blog);
      db.run(`delete from blog where blog_id= ?;`, [req.body.blog]);     
      res.redirect('/');
    }
  );
})


// GET home page. */
router.get('/create', function (req, res, next) {
  res.render('create', { title: 'Express Todo List' })
  
  // var db = new sqlite3.Database('mydb.sqlite3',
  //   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  //   (err) => {
  //     if (err) {
  //       console.log("Getting error " + err);
  //       exit(1);
  //     }
  //     //Query if the table exists if not lets create it on the fly!
  //     db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
  //       (err, rows) => {
  //         if (rows.length === 1) {
  //           console.log("Table exists!");
  //           db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
  //             console.log("returning " + rows.length + " records");
  //             res.render('index', { title: 'Express Todo List', data: rows });
  //           });
  //         } else {
  //           console.log("Creating table and inserting some sample data");
  //           db.exec(`create table blog (
  //                    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
  //                    blog_txt text NOT NULL);`,
  //             () => {
  //               db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
  //                 res.render('index', { title: 'Express Todo List', data: rows });
  //               });
  //             });
  //         }
  //       });
  //   });
});

module.exports = router;