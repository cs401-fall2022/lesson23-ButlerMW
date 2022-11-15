// var express = require('express');
// var router = express.Router();
// const sqlite3 = require('sqlite3').verbose()

// /* GET create page. */
// router.get('/', function (req, res, next) {
//   res.render('create', { title: 'WRITER\'S BLOCK' })
//   console.log("this is the new page");
// });

// /* Add Article */
// router.post('/add', (req, res, next) => {
//   var db = new sqlite3.Database('mydb.sqlite3',
//     sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//     (err) => {
//       if (err) {
//         console.log("Getting error " + err);
//         exit(1);
//       }
//       console.log("inserting " + req.body.blog);
//       db.run(`insert into blog ( blog_txt) values (?);`, [req.body.blog]);
//       //redirect to homepage
//       res.redirect('/');
//     }
//   );
// })


// module.exports = router;
