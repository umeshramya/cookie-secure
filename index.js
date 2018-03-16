var util = require("util");
var queryString = require("querystring");


var setCookieString = function(req, res, name, value, maxAge, httponly=true, https=false){
    if(httponly==true){
        var onlyHTTP = "httponly";
    }else{
        var onlyHTTP = "";
    }
    if (https == true){
        return `${name} = ${value};max-age=${maxAge};${onlyHTTP};SameSite=Strict;Secure;`;
    }else{
        return `${name} = ${value};max-age=${maxAge};${onlyHTTP};SameSite=Strict;`;
    }
   
}
exports.setCookieString = setCookieString;

var setCookie = function(req, res, cookieString, data="",  resEnd=false){
    // this sets new cookie 
    res.writeHead(200, {
        'Set-Cookie': cookieString,
        'Content-Type': 'text/plain'
      });
      res.write(data);
      if (resEnd){
        res.end();
      }
}
exports.setCookie = setCookie;


var getCookie = function(req, res, curCookie){
    var cookies = req.headers.cookie;
    if(util.isUndefined(cookies)){
        return  "";
    }else{
        var cookieArray = cookies.split(";");
        for (let index = 0; index < cookieArray.length; index++) {
           
            var curJson = queryString.parse(cookieArray[index]);
            var key = Object.keys(curJson);
            if (key[0].trim() == curCookie){
            return curJson[key[0]];           
                
            }
        }
        
    }

}
exports.getCookie = getCookie;



// test

// test


/*
open git bash and type below commond to generate self signed ssl key and certifiacte
openssl genrsa 1024 > key.pem
openssl req -x509 -new -key key.pem > cert.pem
*/ 
var https = require("https");

var fs = require("fs");
const options={
    key : fs.readFileSync(__dirname + "/key.pem"),
    cert : fs.readFileSync(__dirname + "/cert.pem")
}

https.createServer(options, (req, res) => {
        var co =setCookieString(req, res,  "ertytyst","rve", 60*60*24,false,true);
        setCookie(req, res, co, "done",true);
  }).listen(8000);


var http = require("http");
http.createServer(function(req, res){
    if(req.url = "/"){
        var co = setCookieString(req, res,  "test","uemsh", 60*60*24,false, false);
        setCookie(req, res, co, "dos",true);
       
    }
}).listen(9000);