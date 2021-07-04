const fs = require('fs');
const http = require('http');
const url = require('url');

//reading all the html and json files
const home = fs.readFileSync(`index.html`,'utf-8');
const fullarticle = fs.readFileSync(`fullarticle.html`, 'utf-8');
const data = fs.readFileSync('info.json', 'utf-8');
const dataOb = JSON.parse(data);//converting the text data into an object


//creating a server that takes the request and response and gets the query and pathname from the url
const server = http.createServer((req, res) => {const { query, pathname } = url.parse(req.url, true);
  
//to display the home page which is static
  if (pathname === '/' || pathname === '/home') {
    res.writeHead(200, {'Content-type': 'text/html' });
    res.end(home);
  } 
  //to display the article of the specific figure which is clicked.
  else if (pathname === '/fullarticle') {
    res.writeHead(200, {'Content-type': 'text/html' });  
    //getting the specific data from the object by the type and index of the html element     
    const article = dataOb.filter((dataOb)=>{ return dataOb.type == query.type && dataOb.index==query.index});
    let output = fullarticle.replace(/{%type%}/g, article[0].type);//replacing the data in html template
    output = output.replace(/{%headline%}/g, article[0].headline);
    output = output.replace(/{%writer%}/g, article[0].writer);
    output = output.replace(/{%date%}/g, article[0].date);
    output = output.replace(/{%location%}/g, article[0].location);
    output = output.replace(/{%article%}/g, article[0].article);
    res.end(output);  
  } 
  //error 
  
  else {
    res.writeHead(404, {'Content-type': 'text/html','my-own-header': ' '});
    res.end('Error 404, Page not found!');
  }
});
//request is listened on local host, port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to requests on port 3000');
});
