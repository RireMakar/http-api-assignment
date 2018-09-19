const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses'); // though it isn't just JSON at this point I realized it too late and don't want to risk breaking anything by changing it


const port = process.env.PORT || process.env.NODE_PORT || 3000;


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  const types = request.headers.accept.split(',');

  if (request.method === 'GET') {
    switch (parsedUrl.pathname) {
      case '/':
        htmlHandler.getIndex(request, response);
        break;
      case 'style.css':
        htmlHandler.getCSS(request, response);
        break;
      case '/success':
        jsonHandler.success(request, response, types[0]);
        break;
      case '/badRequest':
        jsonHandler.badRequest(request, response, types[0], params);
        break;
      case '/unauthorized':
        jsonHandler.unauthorized(request, response, types[0], params);
        break;
      case '/forbidden':
        jsonHandler.forbidden(request, response, types[0]);
        break;
      case '/internal':
        jsonHandler.internalError(request, response, types[0]);
        break;
      case '/notImplemented':
        jsonHandler.notImplemented(request, response, types[0]);
        break;
      default:
        jsonHandler.notFound(request, response, types[0]);
        break;
    }
  } else {
    jsonHandler.notFound(request, response, types[0]);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
