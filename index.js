const http = require('http');
const url = require('url');
const fs = require('fs');

const page404 =
    fs.readFileSync('404.html', (err, data) => {
        if (err) throw err;
        return data;
    });


http.createServer((req, res) => {
    const q = url.parse(req.url, true).pathname;
    let loc = '.' + q;

    if (loc === './') loc = 'index.html';

    fs.readFile(loc, (err, data) => {
        if (err) {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.end(page404);
        }
        else {
            fs.readFile(loc, (err, data) => {
                if (err) throw err;
                res.writeHead(200, { 'content-type': 'text/html' });
                res.end(data);
            });
        }
    })
}).listen(5501, () => console.log(`Server running at http://localhost:5500/`))