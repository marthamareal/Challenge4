window.onload = function () {
    let loginForm = document.getElementById('login_form');
    if(loginForm)
        loginForm.onsubmit = loginUser;
        

}

function loginUser(event) {
    event.preventDefault()
    onloading(true)
    let url = "https://ride-my-way-api-database.herokuapp.com/auth/login";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let logins = {
        "email": email,
        "password": password
    };

    fetchAPI(url,'post',logins)
    .then(results => {
            if(!results) return;
            if (results.status === 200 && results.data.token) {
            localStorage.setItem('token', results.data.token);
            console.log(localStorage.getItem('token'))
            onloading(false)
            window.location.href = "../ui/user-profile.html"
        }

        })
}



