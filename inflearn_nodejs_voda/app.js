var express = require('express');
var app = express();
app.use(express.static('public'));

app.listen(3000,function(){
  console.log('start express server on port 3000');
});



for(i= 0; i< 9; i++){
  console.log('hoho');
}

app.get('/',function(req, res){
    res.sendFile(__dirname+"/public/main.html" );
});

app.get('/main',function(req, res){
    res.sendFile(__dirname+"/public/main.html" );
});
