var _under = require('underscore');
// 모듈을 가져와서 우리가 쓸 수 있는 객체 리턴
// underscore는 변수로 _를 관습적으로 쓴다.
var arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_under.first(arr));
console.log(arr[arr.length-1]);
console.log(_under.last(arr));
// underscore는 이리 유용한 라이브러리이다.
