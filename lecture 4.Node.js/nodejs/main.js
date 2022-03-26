var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, update){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${update}
    ${body}
  </body>
  </html>
  `;
};

function templayeList(filelist){
  var list = `<ul>`;
  var i = 0;
  while(i < filelist.length){
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list += `</ul>`;
  return list
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname == '/'){
      if(queryData.id === undefined){
          fs.readdir('./data',function(err, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = templayeList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>
            <p>${description}</p>`, `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(template);
          });
      } else {
        fs.readdir('./data',function(err, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templayeList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>
            <p>${description}</p>`, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
            <form action='delete_process' method='post'>
              <input type='hidden' name='id' value='${title}'>
              <input type= 'submit' value='delete'>
            </form>`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    }
    else if (pathname === '/create'){
      fs.readdir('./data',function(err, filelist){
        var title = 'WEB - Create';
        var list = templayeList(filelist);
        var template = templateHTML(title, list, `
          <form action="/create_process" method = 'post'>
            <p><input type='text' name='title' placeholder='title'></p>
            <p><textarea name='description' placeholder= 'description'></textarea></p>
            <p><input type='submit'></p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(template);
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
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = templayeList(filelist);
          var template = templateHTML(title, list, `
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
          response.end(template);
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
        fs.unlink(`data/${id}`, function(error){
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
app.listen(3000);
