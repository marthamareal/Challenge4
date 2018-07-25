
window.onload = function () {

    let signupForm = document.getElementById('signup_form');
    let loginForm = document.getElementById('login_form');
    let logout = document.getElementById('logout');
    let protected_ui = document.getElementById('protected_ui');

    if(signupForm)
        signupForm.onsubmit = createUser;
    if(loginForm)
        loginForm.onsubmit = loginUser;

    if(logout){

        if (localStorage.getItem('token')){
            logout.style.display = 'block';
            logout.onclick = logoutUser;
        }
    }
    if(protected_ui){
        if (!localStorage.getItem('token')){
            window.location.href = "../ui/login.html"
        }
    }
};

let fetchAPI = function(url, method, headers, data) {
    if(!('fetch' in window)){
         console.log("API not found");
        return;
     }

    const options = {
        method: method,
        headers:headers,
    };

    if(data){
        options.body = JSON.stringify(data)
    }

    let status, ok;

    return fetch(url, options)

        .then(response => {
            status = response.status;
            ok = response.ok;
            return response.json()
        })

        .then(function (results) {

            if (ok) {
                return {data:results, status}
            }
            else {
                 alert(results.message? results.message: results);
            }
        })
        .catch(function (error) {
            return error.message
        })

};

