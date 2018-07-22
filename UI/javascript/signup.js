function createUser(){

    let header = {'Content-Type': 'application/json'};
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
     


    fetch(url, {headers: header, method:'POST', body:JSON.stringify(newUser)})
    .then((response)=> {
        window.alert(response.status);
        window.alert(JSON.stringify(response.body));

    }).catch(function (error) {
        console.log("something happened",error)
    })
    
}