function f1(){
  console.log(1+1);
  console.log(1+3);
}

// 자바스크립트에서는 함수가 변수에 담길 수 있다.
// 함수도 데이터이기에 배열에 담길 수도 있다.
var a = [f];

var o = {
  func:f
}
// 이렇게 객체에 함수를 담는 것이 좋다.
o.func();

// 이런 것들이 다 가능하다.
