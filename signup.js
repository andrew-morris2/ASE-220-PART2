const input = require('prompt-sync')();
const fs = require('fs');
const validator = require('validator');
const http = require('axios');

function addUsers(username, password){
    var readData = fs.readFileSync('credentials.json', 'utf8');
    var data = JSON.parse(readData);
    data.push({username: username, password: password         
    });

    let updatedJson = JSON.stringify(data, null, 2);
    fs.writeFileSync('credentials.json', updatedJson);
    console.log('Success!');
}

function signUp(){
    let newEmail;
    do{
        newEmail = input('Enter an email address: ');
        if (!validator.isEmail(newEmail)){
            console.log("Invalid email address. Enter a valid email address.")
        }
    } while(!validator.isEmail(newEmail));
    
    let newPassword;
    let verifyPassword;
    do{
        newPassword = input("Enter a new password: ");
        verifyPassword = input('Retype password: ');
        if (verifyPassword !== newPassword){
            console.log("Passwords do not match. Please try again.");
        }
    }while(verifyPassword !== newPassword);
    
    addUsers(newEmail, newPassword);

    http.post('http://localhost:80/api/signup', {
        username: newEmail,
        password: newPassword
    })
    .then(response =>{
        console.log(response.data);
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}

signUp();