'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 8080;
let cookieSession = require("cookie-session");
let cookieParser = require("cookie-parser");
let serveStatic = require("serve-static");

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ["ILikeThisKey"] }));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi({
    apiDocs: "/backend/spec.yaml",
    swaggerUi: "/backend/swaggerui"
  }));

  // Link index.js to front end index.html
  app.use(serveStatic(__dirname + "/FrontEnd"));

  // Serve static files as backend documentation and source code
  app.use("/backend", function (req, res, next) {
    if (req.url === "/main.html") {
      fs.createReadStream("./FrontEnd/pages/main.html")
        .on("close", () => res.end())
        .pipe(res);
    }
    else if (req.url === "/app.zip") {
      fs.createReadStream("./app.zip")
        .on("close", () => res.end())
        .pipe(res);
    }
    else next()
  });

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
