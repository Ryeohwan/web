var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-Parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  // 인코딩은 아스키형태를 다른 형태로 치환해서 보내는 것이다. 처리가 쉽

var cors = require('cors');

app.set('view engine','ejs');
app.listen(3000,function(){
  console.log('start express server on port 3000');
});


app.get('/',function(req, res){
    res.sendFile(__dirname+"/public/main.html" );
});

app.get('/main',function(req, res){
    res.sendFile(__dirname+"/public/main.html" );
});

app.post('/email_post', function(req, res){
  console.log(req.body.email);
  res.render('email.ejs',{'email': req.body.email});  // 템플릿 엔진 ejs를 사용하였다. express view engine 으로 검색해서 하면 된다. pug
})

// render 는 응답값을 줄 때 데이터랑 html과 결합된 상태로 클라이언트에 내려주겠다.

app.post('/ajax_send_email', function(req, res){
  console.log(req.body.email);
  // check valudation about input value => select db
  var responseData = {'result' : 'ok', 'email': req.body.email};
  res.json(responseData);
});

app.use(cors());
