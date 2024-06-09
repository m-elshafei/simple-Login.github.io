// all inputs
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
    // to get base url (localhost)
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

// to say welcome in home page
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}




//for check inputs is empty or not
function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}





// for check email is exist
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    // to store all value as object
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}




// ============= for login================
//for check inputs is empty or not
function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

// Ensure these variables are defined and populated correctly
var signUpArray = [
    { email: 'example@example.com', password: 'password123', name: 'John Doe' }
];
var baseURL = '/';

function isLoginEmpty() {
    var email = document.getElementById('signinEmail').value.trim();
    var password = document.getElementById('signinPassword').value.trim();
    return email !== '' && password !== '';
}

function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var password = document.getElementById('signinPassword').value;
    var email = document.getElementById('signinEmail').value;
    var found = false;

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase() &&
            signUpArray[i].password.toLowerCase() === password.toLowerCase()) {
            
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            
            if (baseURL === '/') {
                location.replace('https://m-elshafei.github.io/simple-Login' + '/login.html');
            } else {
                location.replace(baseURL + '/login.html');  // Adjusted to a single slash
            }
            
            found = true;
            break;  // Exit the loop once a match is found
        }
    }

    if (!found) {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

// Attach the login function to a button click event or form submission
// document.getElementById('loginButton').addEventListener('click', login);






// for logout
function logout() {
    localStorage.removeItem('sessionUsername')
}