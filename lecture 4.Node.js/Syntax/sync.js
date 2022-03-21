var fs = require('fs');
//read file sync
// console.log('A');
// var result = fs.readFileSync(`${__dirname}/sample.txt`,'utf8');
// var result_node = fs.readFileSync(`${__dirname}/../nodejs/sample.txt`,'utf8');
// console.log(result);
// console.log(result_node);
// console.log('c');


console.log('A');
fs.readFile(`${__dirname}/sample.txt`,'utf8',function(err,result){
  console.log(result);
});
fs.readFile(`${__dirname}/../nodejs/sample.txt`,'utf8',function(err,result){
  console.log(result);
});
console.log('c');
