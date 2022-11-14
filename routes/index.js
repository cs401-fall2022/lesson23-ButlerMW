var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
// const update = document.querySelector('.edit-button')


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
              res.render('index', { title: 'Writer\'s Block', data: rows });
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(`create table blog (
                     blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     blog_txt text NOT NULL);`,
              () => {
                db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
                  console.log(rows);
                  res.render('index', { title: 'Express Todo List', data: rows });
                });
              });
          }
        });
    });
});

router.post('/add', (req, res, next) => {
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


// // GET create page. */
// router.get('/create', function (req, res, next) {
//   res.render('create', { title: 'WRITER\'S BLOCK' })
  
//   // var db = new sqlite3.Database('mydb.sqlite3',
//   //   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//   //   (err) => {
//   //     if (err) {
//   //       console.log("Getting error " + err);
//   //       exit(1);
//   //     }
//   //     //Query if the table exists if not lets create it on the fly!
//   //     db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
//   //       (err, rows) => {
//   //         if (rows.length === 1) {
//   //           console.log("Table exists!");
//   //           db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
//   //             console.log("returning " + rows.length + " records");
//   //             res.render('index', { title: 'Express Todo List', data: rows });
//   //           });
//   //         } else {
//   //           console.log("Creating table and inserting some sample data");
//   //           db.exec(`create table blog (
//   //                    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
//   //                    blog_txt text NOT NULL);`,
//   //             () => {
//   //               db.all(` select blog_id, blog_txt from blog`, (err, rows) => {
//   //                 res.render('index', { title: 'Express Todo List', data: rows });
//   //               });
//   //             });
//   //         }
//   //       });
//   //   });
// });

// GET edit page. */
// router.get('/edit/:blog_id', function (req, res, next) {
//   console.log(`request id: `, req.params.blog_id );
//   // res.render('edit', { title: 'WRITER\'S BLOCK' });

//   var db = new sqlite3.Database('mydb.sqlite3',
//   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//   (err) => {
//     if (err) {
//       console.log("Getting error " + err);
//       exit(1);
//     }
//       // blog = db.run(`select from blog where blog_id= (?);`, [req.params.blog_id]);
//   });

// });


// EDIT
router.get('/edit/:id', (req, res) => {
  console.log(`request id: `, req.params.id );
  console.log(`request body.blog: `, req.body.blog );

  var db = new sqlite3.Database('mydb.sqlite3',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log("Getting error " + err);
      exit(1);
    }
      // const art = db.all(`select from blog where blog_id=` + req.params.id + `;`);
      console.log(`select from blog where blog_id= ` + req.params.id + `;`);
      console.log(art);
  
      db.all(`select from blog where blog_id=` + req.params.id + `;`, (err, art) => {
        console.log(art);
        res.render('edit', { title: 'Writer\'s Block', art: art })
      });
    });

  // document.findById(req.params.id, function(err, article) {
    // res.render('edit', {article: article});
  // })
})


module.exports = router;