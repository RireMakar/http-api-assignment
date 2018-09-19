const respondJSON = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(JSON.stringify(content));
  response.end();
};

const respondXML = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const sendJSON = (request, response, idVal, msgVal, status) => {
  const responseJSON = {
    id: idVal,
    message: msgVal,
  };
  respondJSON(request, response, responseJSON, 'application/json', status);
};

const sendXML = (request, response, idVal, msgVal, status) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <id>${idVal}</id>`;
  responseXML = `${responseXML} <message>${msgVal}</message>`;
  responseXML = `${responseXML} </response>`;

  respondXML(request, response, responseXML, 'text/xml', status);
};

const success = (request, response, types) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'Success', 'Code 200: Successful response.', 200);
  } else {
    sendJSON(request, response, 'Success', 'Code 200: Successful response.', 200);
  }
};

const badRequest = (request, response, types, params) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'Bad request', 'Code 400: Parameter missing or false.', 400);
  } else if (params.valid === 'true') { sendJSON(request, response, '', 'Code 200: Parameters valid, successful.', 200); } else { sendJSON(request, response, 'Bad request', 'Code 400: Parameter missing or false.', 400); }
};

const unauthorized = (request, response, types, params) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'Unauthorized', 'Code 401: loggedIn parameter false.', 401);
  } else if (params.loggedIn === 'yes') { sendJSON(request, response, '', 'Code 200: loggedIn true, content successfully displayed.', 200); } else { sendJSON(request, response, 'Unauthorized', 'Code 401: loggedInParameter false.', 401); }
};

const forbidden = (request, response, types) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'Forbidden', 'Code 403: You are forbidden from viewing this content.', 403);
  } else {
    sendJSON(request, response, 'Forbidden', 'Code 403: You are forbidden from viewing this content.', 403);
  }
};

const internalError = (request, response, types) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'Internal', ' Code 500: Internal Server Error. Something went wrong, try refreshing.', 500);
  } else {
    sendJSON(request, response, 'Internal', 'Code 500: Internal Server Error. Something went wrong, try refreshing.', 500);
  }
};

const notImplemented = (request, response, types) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'Not Implemented', 'Code 501: Request unimplemented.', 501);
  } else {
    sendJSON(request, response, 'Not Implemented', 'Code 501: Request unimplemented', 501);
  }
};

const notFound = (request, response, types) => {
  if (types[0] === 'text/xml') {
    sendXML(request, response, 'not found', 'Code 404: Page not found.', 404);
  } else {
    sendJSON(request, response, 'not found', 'Code 404: Page not found.', 404);
  }
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
