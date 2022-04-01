var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-Parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  // 인코딩은 아스키형태를 다른 형태로 치환해서 보내는 것이다. 처리가 쉽
var main = require('./router/main');


var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'ryeo',
  password : 'todo',
  database : 'js_study'
});

connection.connect();



app.set('view engine','ejs');
app.listen(3000,function(){
  console.log('start express server on port 3000');
});

app.use('/main', main); // 메인에 대한 라우터는 이걸 써라

app.get('/',function(req, res){
    res.sendFile(__dirname+"/public/main.html" );
});
