window.onload = function () {
    
    let signupForm = document.getElementById('signup_form');
    if(signupForm)
        signupForm.onsubmit = createUser;

}


function createUser(event){
    event.preventDefault()
    onloading(true)
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
    let url = "https://ride-my-way-api-database.herokuapp.com/auth/signup";

    fetchAPI(url,'post',newUser)
        .then(results => {

            if (results.status === 201) {
                    window.location.href = '../ui/login.html';
                    onloading(false)
                    alert("Account created successfully login with your details")
                }
        }
    ).catch(function(error){
        console.log(error)
    })

}



