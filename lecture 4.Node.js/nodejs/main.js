var http = require('http');  // 모듈을 가져왔다.
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
//refactoring 기능은 동일하게 하면서 더 보기 쉽게 하는 것
// 객체나 함수나 배열을 사용하여서 유지보수 쉬운 형태로 만들자.
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHTML = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname == '/'){
      if(queryData.id === undefined){
          fs.readdir('./data',function(err, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.List(filelist);
            var html = template.HTML(title, list, `<h2>${title}</h2>
            <p>${description}</p>`, `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);
          });
      } else {
        fs.readdir('./data',function(err, filelist){
          var filteredId = path.parse(queryData.id).base
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHTML(title);
            var sanitizedDescription = sanitizeHTML(description, {
              allowedTags:['h1']
            });
            var list = template.List(filelist);
            var html = template.HTML(title, list, `<h2>${sanitizedTitle}</h2>
            <p>${sanitizedDescription}</p>`, `<a href="/create">create</a> <a href="/update?id=${sanitizedTitle}">update</a>
            <form action='delete_process' method='post'>
              <input type='hidden' name='id' value='${sanitizedTitle}'>
              <input type= 'submit' value='delete'>
            </form>`);
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    }
    else if (pathname === '/create'){
      fs.readdir('./data',function(err, filelist){
        var title = 'WEB - Create';
        var list = template.List(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method = 'post'>
            <p><input type='text' name='title' placeholder='title'></p>
            <p><textarea name='description' placeholder= 'description'></textarea></p>
            <p><input type='submit'></p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);
      });
    }
    else if (pathname === '/create_process'){
      var body = '';
      request.on('data',function(data){ //post로 가져오는게 많을 경우 대비
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`}); //302는 페이지를 다른 곳으로 리다이렉션 시켜라, 200은 성공
          response.end();
        })
      });
    }
    else if (pathname === '/update'){
      fs.readdir('./data',function(err, filelist){
        var filteredId = path.parse(queryData.id).base
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.List(filelist);
          var html = template.HTML(title, list, `
            <form action="/update_process" method = 'post'>
              <input type='hidden' name='id', value='${title}'>
              <p>
                <input type='text' name='title' placeholder='title' value= '${title}'>
              </p>
              <p>
                <textarea name='description' placeholder= 'description'>${description}</textarea>
              </p>
              <p><input type='submit'></p>
            </form>
            `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          response.writeHead(200);
          response.end(html);
        });
      });
    }
    else if(pathname ==='/update_process'){
      var body = '';
      request.on('data',function(data){ //post로 가져오는게 많을 경우 대비
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title;
        var id = post.id;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
            response.end();
          });
        });
      });
    }
    else if(pathname ==='/delete_process'){
      var body = '';
      request.on('data',function(data){ //post로 가져오는게 많을 경우 대비
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base
        fs.unlink(`data/${filteredId}`, function(error){
          response.writeHead(302, {Location: encodeURI(`/`)});
          response.end();
        })
      });
    }
    else {
      response.writeHead(404); // 헤드가 200이라는 것은 서버가 브라우저에게 성공적
      response.end('Not found');
    }
});
app.listen(3000);  // 요청에 대해 응답할 수 있도록 구동시키는 것.
