# cookie-secure
![verson](https://img.shields.io/badge/version-1.0.1-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)


This node module for setting cookies securarly

This module sets and get cookie 
1. choose expires or max-age
2. httponly set true to prevent access from client javascript access
3. Same-site sting by defualt is `strict` other option is `lax`

Below code you will see how set https server as how to use secure cookie. 

To get self signed SSL use
```
/*
open git bash and type below commond to generate self signed ssl key and certifiacte
openssl genrsa 1024 > key.pem
openssl req -x509 -new -key key.pem > cert.pem
*/ 
```

```
var cookie = require("cookie-secure");

var https = require("https");

var fs = require("fs");
const options={
    key : fs.readFileSync(__dirname + "/key.pem"),
    cert : fs.readFileSync(__dirname + "/cert.pem")
}

https.createServer(options, (req, res) => {
    var curCookie = "testHTTPS";
    if(req.url = "/"){
        var co =cookie.setCookieString(req, res, curCookie ,"rve", "",60*60*24,false,true);
        cookie.setCookie(req, res, co, "done",true);
    }else if(req.url == "/get_cookie"){
        cookie.getCookie(req, res, curCookie);
    }

  }).listen(8000);


var http = require("http");
http.createServer(function(req, res){
    var curCookie = "testHTTP";
    if(req.url = "/"){
        var co = cookie.setCookieString(req, res,  curCookie,"uemsh", Date(),60*60*24,false, false);
        cookie.setCookie(req, res, co, "done",true);
       
    }else if(req.url == "/get_cookie"){
        cookie.getCookie(req, res, curCookie);
    }
}).listen(9000)
```
