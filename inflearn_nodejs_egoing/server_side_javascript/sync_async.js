var fs = require('fs');
console.log('1');
var data = fs.readFileSync('data.txt',{encoding:'utf8'});
console.log(data);

// 1이 실행된 후 동기적 방식으로 텍스트 파일 읽은 후에 변수로 전달
// 리드 싱크 파일이 10분짜리 작업이면 10분간 있다가 작동될 것이다.

console.log('2');
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
  console.log(3)
  console.log(data)
});
console.log(4);
 // 노드가 data파일을 읽고 그 작업이 끝난 후 익명함수 콜백방식으로 전달된 그
 // 함수를 readFile 이 내부적으로 끝났을 때 전달 에러 없으면 null보내주고 성공했으면 data라는 저 두 번쨰 매개변수의 값으로 data.txt 값의 값을 전달한 후 호출 이후 콘솔로그로 출력이 가능한 것이다.


 // 이러면 2 4 3 data 순으로 실행이 되는데
 // 2 후 readFile이 백그라운드에서 실행된다 생각하자.
 // 다른 사람에게 던져버렸다. 이후 바로 4번 실행
 // 그 다음에 파일을 읽는 작업이 끝난 후 리드 파일에 콜백으로 전달한
 // 이 익명함수를 리드파일이 실행해서 두 번째 인자의 값으로 data.txt의
 // 내용전달했기에 3이 실행이 된 것 이다.

 // 이런 비동기식이라 node.js가 매우 빠르다.
