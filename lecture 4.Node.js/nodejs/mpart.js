var M = {
  v:'v',
  f:function(){
    console.log(this.v);
  }
}

module.exports = M;  // M을 밖에서 사용할 수 있게 보내겠다.
