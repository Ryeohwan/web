// main app or entry app
// 규모가 크면 여러개의 파일로 나눠지게 된다.
// app.js 는 express 에서 제안하는 메인 어플의 이름이다.
var express = require('express');
var app = express();
// 이런 사회적 약속
app.use(express.static(__dirname + '/public')); // 정적인 파일이 위치할 디렉토리

app.get('/',function(req, res){
  res.send('Hello friend!');
});
// 사용자는 get이나 host 방식으로 접속 가능인데 url 직접 치고오는건
// get으로 들어온다.

app.get('/login',function(req,res){ //get은 라우트 - 길을 찾는다.
  res.send('login plz');
})
// http://localhost:3000/login 이런 경로로 들어왔을 때 어떤 것이
// 실행되는가

app.get('/bigword',function(req,res){ //get은 라우트 - 길을 찾는다.
  res.send('<h1>Hi hello!</h1>');
})

app.get('/route',function(req, res){
  res.send('Hello Router!, <img src="/route.png">');
});

app.get('/dynamic', function(req, res){ // 다시 실행시켜야 변경사항 적용
  var lis = '';
  for(var i = 0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      hello hoihoi!
      <ul>
      ${lis}   //이렇게 해야 변수로써 쓸 수 있다.
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
})
// 원래 이 html을 자바스크립트에 써넣으려면
// 역슬래쉬를 매 문장 끝에 써넣어줘야 한다.
// 하지만 esc 밑에 물결을 쉬프트하지않고 그냥 쓰면
// `` 이게 되는데 여기다가 html문서 복붙하면 쓸 수 있다.
// `` 그레이브 엑센트라고 한다.

app.listen(3000, function(){
  console.log('connected 3000 port');
});
// 포트를 리슨할 수 있게 한다.
