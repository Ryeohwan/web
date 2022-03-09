const http = require('http');  // 상수 http에 http라는 모듈을 할당 상수는 변하지 않는다. 상록수
const hostname = '127.0.0.1'; //이 컴퓨터의 ip
const port = 1338; //포트는 1337을 리스닝한다.
// 그니까 127.어쩌구 저걸 치고 들어온 사용자에게 응답라.
http.createServer((req, res) => { //서버 한 대를 만드면서 이 서버에 리스닝하게 만든다.
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World\n');  // 이렇게 하면 서버라는 리턴하는데
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); //그 객체는 리슨메소드 갖고있어서 호출
});
// 웹 서버가 되는 코드이다.
// 웹브라우저로부터 요청한 내용을 받아 hello world를 출력한 것이다.
// 컴퓨터에서 할 수 있는 많은 일들 중에 nodejs가 신경쓰는 것은 서버에 들어오는 요청을 응답하는 어플리케이션을
// 만들 수 있는 기반을 제공한다.

//require 노드제이에스에서 제공하는 http라는 모듈이 요구된다.
