var express = require('express');
var app = express();
app.use(express.static('lib'));

var bodyParser = require('body-Parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engien','ejs');
app.listen(3000,function(){
  console.log('3000 port is running!');
});

app.get('/',function(req, res){
  res.sendFile(__dirname+"/lib/sec_2_home.html");
});

app.get('/sec_2_home', function(req, res){
  res.sendFile(__dirname+'lib/sec_2_home.html');
});

app.post('/search_post',function(req, res){
  res.render('search_post.ejs',{'search': req.body.search});
});

app.post('/ajax_search', function(req, res){
  var responseData = {'result' : 'ok', 'search': req.body.search};
  res.json(responseData);
});
