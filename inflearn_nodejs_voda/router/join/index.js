var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

//database settings
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'ryeo',
  password : 'todo',
  database : 'js_study'
});

connection.connect();

router.get('/', function(req, res){
  console.log('get join url');
  res.sendFile(path.join(__dirname, '../../public/join.html'))
});

router.post('/', function(req, res){
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var password = body.password;  // post를 받아오는

  // var query = connection.query('insert into user (email,name,pw) values ("'+ email +'", "'+ name +'", "'+ password +'")', function(err,rows){
  //   if(err) {throw err;}
  //   console.log('ok db inserted');
  // })// sql문을 저 query 안에 넣어주면 된다.

  var sql = {email: email, name: name, pw: password};
  var query = connection.query('insert into user set ?', sql, function(err,rows){  // rows는 db에 넣고 나서 결과값이다.
    if(err) {throw err;}
    else
      res.render('welcome.ejs',{'name': name, 'id': rows.insertId})
  })  // 저 set 으로 간단하게 표현이 가능하고 sql로 json 을 이용할 수 있다.
})

module.exports = router;
