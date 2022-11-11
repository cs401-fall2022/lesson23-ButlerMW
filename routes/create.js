// var express = require('express');
// var router = express.Router();
// const sqlite3 = require('sqlite3').verbose()

// /* GET create page. */
// router.get('/create', function (req, res, next) {
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
//   console.log("this is the new page");
// });