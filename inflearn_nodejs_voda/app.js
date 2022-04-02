var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-Parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  // 인코딩은 아스키형태를 다른 형태로 치환해서 보내는 것이다. 처리가 쉽다.
var router = require('./router/index');


app.set('view engine','ejs');
app.listen(3000,function(){
  console.log('start express server on port 3000');
});


app.use(router);
