const http=require('http');
const fs=require('fs');

function addUsers(username, password){
    var readData = fs.readFileSync('credentials.json', 'utf8');
    var data = JSON.parse(readData);
    data.push({username: username, password: password         
    });

    let updatedJson = JSON.stringify(data, null, 2);
    fs.writeFileSync('credentials.json', updatedJson);
    console.log('Success!');
};

function handleSignUp(req, res){
    let body = '';

    // Accumulate the request body
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    // Once the request body is fully received
    req.on('end', () => {
        // Parse the JSON body into an object
        const userData = JSON.parse(body);

        console.log('Received signup data:', userData);
        // Here you can call your addUsers function or any other signup logic
        addUsers(userData.username, userData.password);
        // Respond to the client
        res.writeHead(302, { 'Location': 'signin.js' });
        res.end(JSON.stringify({ message: 'Signup successful' }));
    });
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST'){
        if (req.url === '/api/signup'){
            handleSignUp(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'Error', error: 'Invalid request' }));
            }
    }
})

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});