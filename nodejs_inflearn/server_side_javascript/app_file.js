var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs =require('fs');
const path = require('path');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
// app중간에서 요청 가로채서 body라는 프로퍼티 생성해서 post 에 접근간으
app.set("views", path.join(__dirname, "views_file"));
// path.join 뒤에 __dirname,"폴더이름"
app.set('view engine','pug');


app.listen(4000, function(){
  console.log('Connected, 4000 port!');
})

app.get('/topic/new',function(req, res){
  res.render('new');
})

app.post('/topic', function(req, res){
  var title = req.body.title;
  var dis = req.body.discription;
  // 파일 제어를 위해서 'fs'
  fs.writeFile('data/'+title, dis, function(err){
    //writeFile '디렉토리'+저장할 내용,콜백
    if(err){
      console.log(err);
      // 이러면 cmd 에 상세한 오류가 발생한다.
      // 자세한 에러리포팅은 밝히면 안된다. 보안 취약점이 될 수 있다.
      res.status(500).send('Internal Server Error');
    }
    res.send('please succes!');
  });
});

app.get('/topic',function(req,res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('view', {topics:files});
  })
});

app.get('/topic/:id',function(req,res){
  var id = req.params.id;
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    fs.readFile('data/'+id,'utf8',function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view', {topics:files, title:id, discription:data});
    })
  })
})
