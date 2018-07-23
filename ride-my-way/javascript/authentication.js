
function createUser(){

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let city = document.getElementById("city").value;
    let password = document.getElementById("password").value;

    let newUser = {
                "first name":fname,
                "last name": lname,
                "email": email,
                "city": city,
                "phone_no": phone,
                "password": password
            };

    let url = "http://127.0.0.1:5000/auth/signup";

     if(!('fetch' in window)){
         console.log("API not found")
     }
     


    fetch(url, {headers: {'Content-Type': 'application/json'}, method:'POST', body:JSON.stringify(newUser)})

    .then((response) =>{

        if(response.status === 201){
             alert("Account created successfully");
        }
        else {
           return response.json()
            // window.location.replace("../login.html")
        }

    }).then(response =>{
        alert(response.message);
        console.log(response.message);
    })
        .catch(function (error) {
        console.log("something happened",error)
    })
    
}

function loginUser() {

    let url = "http://127.0.0.1:5000/auth/login";

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

     if(!('fetch' in window)){
         console.log("API not found")
     }

     fetch(url,
         {
         headers: {'Content-Type': 'application/json'},
         method:'POST',
         body:JSON.stringify(
             {
                 "email":email,
                 "password":password
             }
             )})
         .then((response)=>{
             if(response.status === 200){
                 return response.json()
             }
             else if (response.status === 401) {
                 window.alert("Email and Password don't match");
                 return response.json()
             }
         })
        .then(response => {
            sessionStorage.setItem('token', response.token);
            alert(response.status);
            alert(sessionStorage.getItem('token'));

        }).catch(function (error) {
            console.log("something happened",error.message)
        })

}