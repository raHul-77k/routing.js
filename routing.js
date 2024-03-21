
const fs =  require('fs');
// Create a server
const requestHandler =(req, res) => {
    // Parse the URL
    const url = req.url;
    const method = req.method;
    let message = '';

    // Handle requests based on URL
    if (url === '/') {

        
        try{
            message = fs.readFileSync('message.txt', 'utf8')
        }catch(err){
            console.log(err);
        }

        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>');
        res.write('<h2>Message:</h2>');
        res.write(`<p>${message}</p>`); // Display message content
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title><head>');
    res.write('<body><h1>Hello from NodeJs</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;
