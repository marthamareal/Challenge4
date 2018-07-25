
function createUser(event) {
    event.preventDefault();

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let city = document.getElementById("city").value;
    let password = document.getElementById("password").value;

    let newUser = {
        "first name": fname,
        "last name": lname,
        "email": email,
        "city": city,
        "phone_no": phone,
        "password": password
    };
    // let url = "https://ride-my-way-api-database.herokuapp.com/auth/signup";

    let url = "http://127.0.0.1:5000/auth/signup";
    let method = 'post';
    let header = {'Content-Type': 'application/json'};

    fetchAPI(url, method,header, newUser)
        .then(results => {

            if (results.status === 201) {
                    window.location.href = '../ui/login.html';
                    alert("Account created successfully login with your details")
                }
        }
    ).catch(function(error){
        console.log(error)
    })

}

function loginUser(event) {

    event.preventDefault();
    // let url = "https://ride-my-way-api-database.herokuapp.com/auth/login";
    let url = "http://127.0.0.1:5000/auth/login";

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let logins = {
        "email": email,
        "password": password
    };

    let headers = {'Content-Type': 'application/json'};
    let method = 'post';

    fetchAPI(url, method, headers, logins)
        .then(results => {
            if(!results) return;
            if (results.status === 200 && results.data.token) {
            localStorage.setItem('token', results.data.token);
            window.location.href = "../ui/user-profile.html"
        }

        })
}

function logoutUser(event) {
    event.preventDefault();
    let url = "http://127.0.0.1:5000/auth/logout";
    let headers = {'Content-Type': 'application/json', 'token':localStorage.getItem('token')};
    let method = 'get';

    fetchAPI(url, method, headers)
        .then(results =>{
            if (!results) return;
            if (results.status ===200){
                localStorage.clear();
                window.location.href = "../ui/index.html"
            }
        })
}


