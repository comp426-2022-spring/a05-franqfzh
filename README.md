[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7585503&assignment_repo_type=AssignmentRepo)

# a05 Human Interface

In this assignment, you will build an HTML human interface for your API. You will also document your API endpoints and consider package structure.

## DO NOT CLONE THIS REPOSITORY DIRECTLY

Use the GitHub classroom link instead: https://classroom.github.com/a/PUVGxeMe

If you clone this repo directly, it will not be added to the organization as an individual repo associated with your account and you will not be able to push to it.

## Instructions

Full instructions for this assignment are available at: https://comp426.johndmart.in/a/05/

<!-- DELETE EVERYTHING ABOVE THIS LINE -->

# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation

```
node server.js [options]
--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.
--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws
            an error with the message "Error test successful." Defaults to
            false.
--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.
--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flip/
```

#### Response body

```
{"flip":"tails"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/json; charset=utf-8
Content-Length: 16
ETag: W/"10-N9e0DDykqBPnqphc8f4bzHcjsuM"
Date: Fri, 08 Apr 2022 13:03:59 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flips/5
```

#### Response body

```
{"raw":["tails","tails","heads","heads","tails"],"summary":{"heads":2,"tails":3}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 81
ETag: W/"51-pRC+PCpwFGivL28AGJlwRwDo6XY"
Date: Fri, 08 Apr 2022 13:36:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coin/ (GET)

#### Request cURL

```
curl --data "number=5" http://localhost:5555/app/flip/coins/
```

#### Response body

```
{"raw":["tails","tails","tails","heads","tails"],"summary":{"heads":1,"tails":4}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 81
ETag: W/"51-IWzVVZssN58fXvSJkEM6w8IgpU8"
Date: Fri, 08 Apr 2022 13:48:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/flip/call/tails
```

#### Response body

```
{"call":"tails","flip":"tails","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Fri, 08 Apr 2022 13:39:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/log/access/
```

#### Response body

```
{"id":1,"remoteaddr":"::1","remoteuser":"undefined","time":"1649363289471","method":"GET","url":"/app","protocol":"http","httpversion":"1.1","secure":"false","status":"200","referer":"undefined","useragent":"curl/7.77.0"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 10619
ETag: W/"297b-FmYrfMsEiHTKIFOfDFPUUhS7Pr4"
Date: Fri, 08 Apr 2022 13:09:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/error/ (GET)

#### Request cURL

```
curl http://localhost:5555/app/log/error
```

#### Response body

```
{ error: e }
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 10619
ETag: W/"297b-FmYrfMsEiHTKIFOfDFPUUhS7Pr4"
Date: Fri, 08 Apr 2022 13:09:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/ (POST)

_Not yet implemented_

#### Request cURL

```
```

#### Response body

```
```

#### Response headers

```
```

### /app/user/new/ (POST)

_Not yet implemented_

#### Request cURL

```
```

#### Response body

```
```

#### Response headers

```
```

### /app/user/update/ (PATCH)

_Not yet implemented_

#### Request cURL

```
```

#### Response body

```
```

#### Response headers

```
```

### /app/user/delete/ (DELETE)

_Not yet implemented_

#### Request cURL

```
```

#### Response body

```
```

#### Response headers

```
```