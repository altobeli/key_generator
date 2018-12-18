const express = require('express');
const bodyParser = require('body-parser');
var keygen = require('ssh-keygen');
const winston = require('winston')



const app = express();

//middleware / routing
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true })); // 

app.get('/', function(request, response) {
    return response.redirect('/input-data');
});

app.get('/input-data',function(request, response) {
    return response.render('input-data');
});

app.post('/generate',function(request, response) {
    
    var name = request.body.name;
    var password = request.body.password;

    keygen({
        comment: name,
        password: password,
        read: true
      }, function(err, out){
        if(err) return console.log('Something went wrong: '+err);
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1> Private Key: </h1> Do not share it with anyone, save it in your computer ASAP<br>');
        response.write('<textarea name="private_key" rows="30" cols="70" form="usrform">' + String(out.key) + '</textarea><br>');
        response.write('<h1> Public Key: </h1> Send this to noc@internetbrands.com <br>');
        response.write('<textarea name="public_key" rows="5" cols="150" form="usrform">' + String(out.pubKey) + '</textarea><br>');
         
        console.log(out);
        //console.log(Object.keys(request));
        });  

        //return response.send(request.body.first); //?first=Michael&last=Hueter&...
});

app.listen(4000, function() {
    console.log('My server is running in port 4000');
});