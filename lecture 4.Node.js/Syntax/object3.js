var o = {
  v1:'v1',
  v2:'v2',
  f1:function f1(){
    console.log(this.v1);
  },
  f2:function f2(){
    console.log(this.v2);  // this 잘 활용하자.
  }
}

// 이렇게 하면 혹시 이후에 누가 f1 이나 f2 함수를 새로
// 선언하더라도 내가 원하는 기능을 쓸 수 있다.



o.f1();
o.f2();
