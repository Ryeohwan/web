var express = require('express');
var app = express();
var router = express.Router();
var path = require('path'); // 상대경로를 쓰기 위해서 path 사용
// router.get('/',function(req, res){ // 루트로 들어와 //여기로 리다이렉트를 하자
//     res.sendFile(__dirname+"/public/main.html" );
// });

router.get('/',function(req, res){ // 루트로 들어와 //여기로 리다이렉트를 하자
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;
