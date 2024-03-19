const input = require('prompt-sync')();
const fs = require('fs');

function signIn(){
    const username = input("Username: ");
    const password = input('Password: ');

    const usersData = fs.readFileSync('credentials.json');
    const users = JSON.parse(usersData);
    const user = users.find(user => user.username === username);

    if (user && user.password === password){
        console.log('Authentication Sucessful')
    } else{
        console.log('Invalid username or password. Please try again.');
    }
}

signIn();