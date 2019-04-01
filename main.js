const http = require("http");
const fs = require("fs");

http.createServer(function(request, response) {


  if (request.url.startsWith("/")) {

    // получаем путь после слеша
    var filePath = request.url.substr(1);
    fs.readFile(filePath, function(error, data) {

      if (error) {

        response.statusCode = 404;
        response.end("Resourse not found!");
      } else {
        response.setHeader("Content-Type", "text/html");
        response.end(data);
      }
    })
  } else {
    // во всех остальных случаях отправляем строку hello world!
    response.end();
  }
}).listen(3000);
